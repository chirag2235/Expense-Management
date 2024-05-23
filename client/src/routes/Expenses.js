import {useContext, useDeferredValue, useEffect, useState } from 'react';
import React from 'react';
import {Icon} from '@iconify/react';
import HomeContainer from '../containers/HomeContainer';
import DateInput from '../components/shared/DateInput';
import FinancialInput from '../components/shared/FinancialInput';
import TextAreaInput from '../components/shared/TextAreaInput';
import {makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest} from '../utils/serverHelpers';
import IconText from '../components/shared/IconText';
import '../styles/expenses.css';
import SingleExpenseCard from '../components/shared/SingleExpenseCard';
import globalContext from '../contexts/globalContext';


const Expenses = ({}) => {
    

    // states to locally store inputs fields data 
    const [title, setTitle] = useState(""); // by default titel is salary
    const [amount, setAmount] = useState();  // by default amout is 0
    const [date, setDate] = useState(new Date()); // by default date is todays date
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Other");

    // fetch expenses data from the global context and use it
    const {expensesData, setExpensesData, totalExpenseAmount, setTotalExpenseAmount} = useContext(globalContext);
    const totalAmount = totalExpenseAmount;
    
    //storing data to local storage for internet failure issues) ------ 
    useEffect(() => { // fetch from local storage
        const storedExpensesData = localStorage.getItem('expensesData');
        if (storedExpensesData) {
            setExpensesData(JSON.parse(storedExpensesData));
        }
    }, []);
    // useEffect(() => {  // save to local storage
    //     localStorage.setItem('expensesData', JSON.stringify(expensesData));
    // }, [expensesData]);
    
    
/* 
// withour using global context approach
    const [expensesData, setExpensesData] = useState([]); // array of expense objects
    const [totalAmount, setTotalAmount] = useState();// to store total amount 

    //storing data to local storage for internet failure issues) ------ 
    useEffect(() => { // fetch from local storage
        const storedExpensesData = localStorage.getItem('expensesData');
        if (storedExpensesData) {
            setExpensesData(JSON.parse(storedExpensesData));
        }
    }, []);

    useEffect(() => {  // save to local storage
        localStorage.setItem('expensesData', JSON.stringify(expensesData));
    }, [expensesData]);
    //-------
    
    // on reload, fetch all teh expenses from backend and stor them in incomesData
    useEffect(()=>{ 
        
        const getData = async() => {
            const response = await makeAuthenticatedGETRequest("/api/expense/my-expenses"); // sending backend api route to the utils fuc to fetch all the incomes from backend
            setExpensesData(response); // storing incomes array of object in state
        }
        getData();

    },[])

    // finding sum of all the latest expenses 
    // this useEffect runs whever there is change in incomeData
    useEffect(()=>{
        let totalAmount = 0;
        expensesData.forEach((expenseObj)=>{
            totalAmount += expenseObj.amount;
        })
        setTotalAmount(totalAmount);
    },[expensesData]) 
*/
    
    // function to create a new expense
    const saveExpense = async () => {

        // fetch the data from states with some validations
        if(title.trim() === "" || amount.trim() === "" || description.trim() === "" || category.trim() === ""){
            alert("all fields are required");
            return;
        }

        const body = {title, amount, date, category, description};
        const response = await makeAuthenticatedPOSTRequest("/api/expense/add-expense", body); // send this data to utils serverHelper func, it will further send it to backend 
        if(response.err){
            alert(response.err);
            return;
        }
        else{
            alert(`${title} added`);
            window.location.reload();
            return;
        }
    }

    return(
        <HomeContainer currActiveScreen={"expenses"}>
            
            <div className='expense-heading-div font-semibold text-3xl text-left flex items-end pl-10 text-gray-700'>
                Expenses
            </div>

            <div className='total-expense-div px-5 py-2 ' >
                <div className='bg-white w-full h-full flex justify-center items-center space-x-2 rounded-xl shadow-lg'>
                    <div className=' font-semibold text-xl text-gray-700'>
                        Total Expense :
                    </div>
                    <span className='text-red-600'>
                        ₹ {totalAmount} 
                    </span>
                </div>
            </div>

            <div className='income-input-and-display  w-full flex'>

                {/* input form */}
                <div className='w-1/4 text-left px-5 space-y-2'> 
                    <div className='font-bold text-gray-700'> 
                        Add a new expense 
                    </div>

                    {/* input fields like title, amount, date */}
                    <FinancialInput 
                        placeholder={"Expense Title"} 
                        value={title} 
                        setValue={setTitle}
                    />
                    <FinancialInput 
                        placeholder={"Expense Amount"}
                        value={amount}
                        setValue={setAmount}
                        type='number'
                    />
                    <DateInput 
                        placeholder={"Enter a Date"}
                        value={date}
                        setValue={setDate}
                    />

                    {/* description */}
                    <TextAreaInput 
                        placeholder={"Description"}
                        value={description}
                        setValue={setDescription}    
                    />

                    {/* dropdown menu */}
                    <div className='w-full '>
                        <select className='w-full  bg-white shadow-lg border border-gray-300 outline-none rounded py-2 px-2' required value={category} name="category" id="category" onChange={(e)=>{setCategory(e.target.value)}}>
                            <option value=""  disabled >Choose Category</option>
                            <option value="Education">Education</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Health">Health</option>
                            <option value="Subscriptions">Subscriptions</option>
                            <option value="Takeaways">Takeaways</option>
                            <option value="Clothing">Clothing</option>  
                            <option value="Bank Transfer">Bank Transfer</option>  
                            <option value="Electronic">Electronic</option>  
                            <option value="Travelling">Travelling</option>  
                            <option value="Installment">Installment</option>  
                            <option value="Other">Other</option>  
                        </select>
                    </div>

                    {/* save btn */}
                    <div className='w-1/2 bg-red-800 flex justify-center items-center text-white py-2 space-x-3 rounded-full cursor-pointer duration-100 delay-70 hover:bg-red-700 bg-opacity-90' onClick={()=>{
                            saveExpense();
                    }}>
                        <div className=''>
                            + Save
                        </div>
                        {/* <Icon icon="lets-icons:add-duotone" color='white' fontSize={23}/> */}
                    </div>
                    
                </div>

                {/* container of all income cards*/}
                <div className='w-3/4 space-y-2 pr-5 overflow-auto mb-3'>
                    <div className='text-left pl-2 flex space-x-2 items-center'>
                        <Icon icon="material-symbols:history" className='text-gray-700' fontSize={20}/>
                        <div className='text-gray-700 font-semibold'>
                            Expense History 
                        </div> 
                    </div>
                    {
                        expensesData.map((item) => {

                            // converting each items date into dd//
                            return (
                                <SingleExpenseCard 
                                    title={item.title}
                                    amount={item.amount}
                                    date={item.date}
                                    description={item.description}
                                    category={item.category}
                                    // formattedDate={formattedDate}
                                    expenseId={item._id}
                                />
                            )
                        })
                    }
                </div> 
            
            </div> 
        </HomeContainer>
    )
}


export default Expenses;
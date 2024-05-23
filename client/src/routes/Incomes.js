import { useEffect, useState } from 'react';
import React from 'react';
import {Icon} from '@iconify/react';
import HomeContainer from '../containers/HomeContainer';
import DateInput from '../components/shared/DateInput';
import FinancialInput from '../components/shared/FinancialInput';
import TextAreaInput from '../components/shared/TextAreaInput';
import {makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest} from '../utils/serverHelpers';
import IconText from '../components/shared/IconText';
import '../styles/incomes.css';
import SingleIncomeCard from '../components/shared/SingleIncomeCard';
import globalContext from '../contexts/globalContext';
import { useContext } from 'react';

const Incomes = ({}) => {

    // static income Data (for styling only)
    // const incomeData = [
    //     {
    //         title: "Income 1",
    //         amount: 100,
    //         date: new Date(),
    //         description:"This is random description",
    //         category:"Finance"
    //     },
    //     {
    //         title:"Income 2",
    //         amount:60,
    //         date:new Date(),
    //         description:"This is random description",
    //         category:"Investment"
    //     },
    //     {
    //         title:"Income 3",
    //         amount:100,
    //         date:new Date(),
    //         description:"This is random description",
    //         category:"Finance"
    //     },
    //     {
    //         title: "Income 4",
    //         amount: 100,
    //         date: new Date(),
    //         description:"This is random description",
    //         category:"Finance"
    //     },
    // ]

    // states to locally store inputs fields data 
    const [title, setTitle] = useState(""); // by default titel is salary
    const [amount, setAmount] = useState();  // by default amout is 0
    const [date, setDate] = useState(new Date()); // by default date is todays date
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Salary");

    // fetching income data from global context and using it   
    const {incomesData, setIncomesData, totalIncomeAmount, setTotalIncomeAmount} = useContext(globalContext);
    const totalAmount = totalIncomeAmount; 
    
    //-----fetching data to local storage (for internet failure issues) ----
    useEffect(() => { // fetch from local storage
        const storedIncomesData = localStorage.getItem('incomesData');
        if (storedIncomesData) {
            setIncomesData(JSON.parse(storedIncomesData));
        }
    }, []);

    // globalContext.js data is beings already stored to localstorage in App.js, so no need to repeat here

    
/*
 // witout global context approach 

    const [incomesData, setIncomesData] = useState([]); // array of income objects
    const [totalAmount, setTotalAmount] = useState();// to store total amount 

    //-----storing data to local storage for internet failure issues) ----
    useEffect(() => { // fetch from local storage
        const storedIncomesData = localStorage.getItem('incomesData');
        if (storedIncomesData) {
            setIncomesData(JSON.parse(storedIncomesData));
        }
    }, []);

    useEffect(() => {  // save to local storage whenever there is change in data 
        localStorage.setItem('incomesData', JSON.stringify(incomesData));
    }, [incomesData]);
    //--------
    
    // on reload, fetch all teh incomes from backend and stor them in incomesData
    useEffect(()=>{ 
        
        const getData = async() => {
            const response = await makeAuthenticatedGETRequest("/api/income/my-incomes"); // sending backend api route to the utils fuc to fetch all the incomes from backend
            setIncomesData(response); // storing incomes array of object in state
        }
        getData();

    },[])

    // finding sum of all the latest incomes 
    // this useEffect runs whever there is change in incomeData
    useEffect(()=>{
        let totalAmount = 0;
        incomesData.forEach((incomeObj)=>{
            totalAmount += incomeObj.amount;
        })
        setTotalAmount(totalAmount);
    },[incomesData]) 
*/

    const saveIncome = async () => {

        // fetch the data from states with some validations
        if(title.trim() === "" || amount.trim() === "" || description.trim() === "" || category.trim() === ""){
            alert("all fields are required");
            return;
        }

        const body = {title, amount, date, category, description};
        const response = await makeAuthenticatedPOSTRequest("/api/income/add-income", body); // send this data to utils serverHelper func, it will further send it to backend 
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
        <HomeContainer currActiveScreen={"incomes"}>
           
            <div className='income-heading-div font-semibold text-3xl text-left flex items-end pl-10 text-gray-700'>
                Incomes
            </div>

            <div className='total-income-div px-5 py-2' >
                <div className=' bg-white w-full h-full flex justify-center items-center space-x-2 rounded-xl shadow-lg'>
                    <div className=' font-semibold text-xl text-gray-700'>
                        Total Income :
                    </div>
                    <span className='text-green-600'>
                        ₹ {totalAmount} 
                    </span>
                </div>
            </div>

            <div className='income-input-and-display  w-full flex'>

                {/* input form */}
                <div className='w-1/4 text-left px-5 space-y-2'> 
                    <div className='font-bold text-gray-700'> 
                        Add a new income 
                    </div>


                    {/* input fields like title, amount, date */}
                    <FinancialInput 
                        placeholder={"Income Title"} 
                        value={title} 
                        setValue={setTitle}
                    />
                    <FinancialInput 
                        placeholder={"Income Amount"}
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
                    <div className='w-full'>
                        <select className='w-full bg-white shadow-lg outline-none border rounded py-2 px-2' required value={category} name="category" id="category" onChange={(e)=>{setCategory(e.target.value)}}>
                            <option value=""  disabled >Choose Category</option>
                            <option value="Salary">Salary</option>
                            <option value="Freelancing">Freelancing</option>
                            <option value="Investments">Investiments</option>
                            <option value="Stocks">Stocks</option>
                            <option value="Bitcoin">Bitcoin</option>
                            <option value="Bank Transfer">Bank Transfer</option>  
                            <option value="Youtube">Youtube</option>  
                            <option value="Other">Other</option>  
                        </select>
                    </div>

                    {/* save btn */}
                    <div className=' w-1/2 bg-green-800 flex justify-center items-center text-white py-2 space-x-3 rounded-full cursor-pointer duration-100 delay-70 hover:bg-green-700' onClick={()=>{
                            saveIncome();
                    }}>
                        <div className=''>
                            + Save
                        </div>
                        {/* <Icon icon="lets-icons:add-duotone" color='white' fontSize={23}/> */}
                    </div>
                    
                </div>

                {/* container of all income cards*/}
                <div className='w-3/4 space-y-2 pr-5 overflow-auto  mb-3'>
                    <div className='text-left pl-2 flex space-x-2 items-center'>
                        <Icon icon="material-symbols:history" className='text-gray-700' fontSize={20}/>
                        <div className='text-gray-700 font-semibold'>
                            Income History
                        </div> 
                    </div>
                    {
                        incomesData.map((item) => {

                            // converting each items date into dd//
                            return (
                                <SingleIncomeCard 
                                    title={item.title}
                                    amount={item.amount}
                                    date={item.date}
                                    description={item.description}
                                    category={item.category}
                                    // formattedDate={formattedDate}
                                    incomeId={item._id}
                                />
                            )
                        })
                    }
                </div> 
            
            </div> 
            
        </HomeContainer>
    )
}

export default Incomes;

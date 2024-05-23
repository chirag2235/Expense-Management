import HomeContainer from '../containers/HomeContainer';
import Chart from '../components/shared/Chart';
import '../styles/dashboard.css';
import DynamicChart from '../components/shared/DynamicChart';
import {Icon} from '@iconify/react';
import { useContext, useEffect } from 'react';
import globalContext from '../contexts/globalContext';
import styled from 'styled-components';

export default function Dashboard({}){

    // fetch data from global context 
    const {userData, incomesData, expensesData, setUserData, totalIncomeAmount, totalExpenseAmount,setIncomesData, setExpensesData} = useContext(globalContext);

    // for recent transactions tab we need combined incomesData and expensesData but sort them based on their creation time (latest created comes first)
    // combining incomesData and expensesData 
    const combinedData = incomesData.concat(expensesData);
    combinedData.sort((obj1, obj2) => new Date(obj2.createdAt) - new Date(obj1.createdAt));


    //-----fetching data from local storage (for internet failure issues) ----
    // data is set to local storage in App.js 
    useEffect(() => { // fetch incomes from local storage
        const storedIncomesData = localStorage.getItem('incomesData');
        if (storedIncomesData) {
            setIncomesData(JSON.parse(storedIncomesData));
        }
    }, []);

    useEffect(() => { // fetch expenses from local storage
        const storedExpensesData = localStorage.getItem('expensesData');
        if (storedExpensesData) {
            setExpensesData(JSON.parse(storedExpensesData));
        }
    }, []);
    useEffect(() => { // fetch userData from local storage (for internet issue cases)
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);


    return(
        <HomeContainer currActiveScreen={"dashboard"}>

            <div className='h-[10%] w-full flex items-center pl-5 font-semibold text-gray-700 text-2xl text-left'>
                <span>  
                    {`Welcome back, ${userData.firstName}`}
                </span>
            </div>

            {/* dashboard container */}
            <div className='h-[90%] dashboard-container w-full space-x-3 '>

                {/* chart & total income etc container (left) */}
                <div className='h-full w-[70%]'>
                    <div className='chart-container bg-white px-4 rounded-lg chart-container shadow-xl'>    
                        <Chart/>
                    </div>
                    <div className='pt-3'>
                        <div className='total-income-expense-balance-container w-full text-gray-700 py-6 space-y-6 bg-white rounded-lg'>
                            <div className='flex justify-center space-x-7 font-bold text-2xl'>
                                <div className=''>Total Income : <span className='text-green-700'> ₹ {totalIncomeAmount}</span> </div>
                                <div className=''>Total Expense :<span className='text-red-700'> ₹ {totalExpenseAmount} </span></div>
                            </div>
                            <div className=' font-bold text-3xl'> Total Balance : ₹ {totalIncomeAmount - totalExpenseAmount}</div>
                        </div>
                    </div>
                </div>


                {/* recent transactions tab (right) */}
                <div className='w-[30%] h-full recent-transactions-container rounded-xl pb-6 '>

                    <div className=' h-[5%] w-full font-bold text-gray-600 text-left flex items-center pl-5 space-x-2'>
                        <Icon icon="mdi:recent" fontSize={22}/>
                        <div> Transactions history </div> 
                    </div>
                    <div className='h-[95%] px-3 w-full overflow-auto space-y-2 pb-3' >
                        {
                            combinedData.map((obj) => {
                                return <RecentTransactionCard 
                                            title={obj.title} 
                                            type={obj.type} 
                                            amount={obj.amount}
                                        />
                            })
                        }

                    </div>
                </div>  
            </div>
           
        </HomeContainer>
    )
}

const RecentTransactionCard = ({title, amount, type}) => {
    return(
        
            <div className='pl-4 recent-transaction-card w-full py-4 bg-white shadow-2xl rounded-lg '>
                <div className='flex items-center '>
                    <div className='w-2/3 flex space-x-3 items-center'>
                        <div className='text-left  font-bold text-gray-500'>
                            {title.toUpperCase()}
                        </div>
                    </div>
                    <div className='w-1/3 space-x-2 flex items-center'>
                        <Icon fontSize={20} icon={`${type=='income'?('ic:baseline-plus'):('ic:baseline-minus')}`} className={`${type=='income'?('text-green-600'):('text-red-600')}`}/>
                        <div className={`${type=='income'?('text-green-500'):('text-red-500')} font-bold`}>
                            ₹ {amount}
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
    )
}


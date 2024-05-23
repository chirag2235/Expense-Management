import {Chart as ChartJs, 
    CategoryScale, 
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

import { useEffect, useState } from 'react';
import { dateFormatter } from '../../utils/clientHelpers';
import {makeAuthenticatedGETRequest} from '../../utils/serverHelpers';

ChartJs.register(
    CategoryScale, 
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

// Chart component 
const Chart = () => {


    // not using globalContext values of 'incomesData, expensesData', here coz they are sorted by creation time, and out need here is data which is sorted by date so we are calling other apis here for data
    // creating local states for these coz they are different data (they are date sorted (only used in charts, nowhere else))
    const[incomesData, setIncomesData] = useState([]);
    const[expensesData, setExpensesData] = useState([]);

    useEffect(()=>{
        try{
            const getData = async () => {                          
                // fetch expenses sorted by expense.date (older date first, latest date at last)
                const response = await makeAuthenticatedGETRequest("/api/income/my-incomes/date-sorted");
                if(response.err){
                    alert(response.err);
                    return;
                }
                else{
                    // note : this date sorted data is only used in chart.js nowhere else
                    setIncomesData(response);
                    localStorage.setItem('incomesData-dateSorted', JSON.stringify(response));
                }
            }
            getData();
        }
        catch(error){
            alert(error);
        }
    },[])
    
    useEffect(()=>{
        try{
            const getData = async () => {
                // fetch expenses sorted by income.date (older date first, latest date at last)
                const response = await makeAuthenticatedGETRequest("/api/expense/my-expenses/date-sorted"); 
                if(response.err){
                    alert(response.err);
                    return;
                }
                else{
                    setExpensesData(response);
                    // note : this date sorted data is only used in chart.js nowhere else, thats why giving its key a different name
                    localStorage.setItem('expensesData-dateSorted', JSON.stringify(response));
                }
            }
            getData();
        }
        catch(error){
            alert(error);
        }
    },[])

//-----fetching date-sorted incomes and expenses data from local storage (for internet failure issues) ----
    useEffect(() => { // fetch incomes from local storage
        const storedIncomesData = localStorage.getItem('incomesData-dateSorted');
        if (storedIncomesData) {
            setIncomesData(JSON.parse(storedIncomesData));
        }
    }, []);

    useEffect(() => { // fetch expenses from local storage
        const storedExpensesData = localStorage.getItem('expensesData-dateSorted');
        if (storedExpensesData) {
            setExpensesData(JSON.parse(storedExpensesData));
        }
    }, []);


// preparing data for the line chart 
    const data = {
        labels: incomesData.map((incomeObj) => {
            const date = incomeObj.date;
            return dateFormatter(date);
        }),
        datasets:[
            {
                label: 'Income',
                data:[
                    ...incomesData.map((incomeObj) => {
                        const amount = incomeObj.amount;
                        return amount;
                    })
                ],
                backgroundColor: 'green',
                tension:'.2'
            },
            {
                label: 'Expense',
                data:[
                    ...expensesData.map((expenseObj) => {
                        const amount = expenseObj.amount;
                        return amount;
                    })
                ],
                backgroundColor: 'red',
                tension:'.2'
            }
        ]
    }

    return(
        <div className='w-full h-full'>
            <Line data={data}/>
        </div>
    )
}


export default Chart;
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Dashboard from './routes/Dashboard';
import Incomes from './routes/Incomes';
import Transactions from './routes/Transactions';
import Expenses from './routes/Expenses';
import { useCookies } from 'react-cookie';
import { useContext, useEffect, useState } from 'react';
import globalContext from './contexts/globalContext';
import { makeAuthenticatedGETRequest } from './utils/serverHelpers';

function App() {

    // react cookies
    const [cookie, setCookie, deleteCookie] = useCookies(["token"]);
    
  // -------------Global Context initialization and updation --------------

    // we can directly fetch context data in App.js (we do not need to use useContext() in App.js to fetch the context values)
    // note : in App.js we define which routes can access context values and which routes can not, to allow specific routes and their childs to access context values wrap them in 'contextName.Provider' tag 
    // initializing Global Context data
    const [incomesData, setIncomesData] = useState([]);  // it will have array of income objects
    const [expensesData, setExpensesData] = useState([]);
    const [totalIncomeAmount, setTotalIncomeAmount] = useState();
    const [totalExpenseAmount, setTotalExpenseAmount] = useState();

    // this is globalContext.js file where all the global data is fetched and stored for further use in other component
    // it is used here so that each component do not fetch data, rather they use this global file for fetching data
    
  // this function will initialize the global context whever it is called
  const fetchData = async () => {
    try {
      // Fetch income data, and store it in globalcontext
      const incomeResponse = await makeAuthenticatedGETRequest('/api/income/my-incomes');
      if (incomeResponse.err) {
        alert(incomeResponse.err);
      } else {
        setIncomesData(incomeResponse);
        localStorage.setItem('incomesData', JSON.stringify(incomeResponse));
      }

      // Fetch expense data
      const expenseResponse = await makeAuthenticatedGETRequest('/api/expense/my-expenses');
      if (expenseResponse.err) {
        alert(expenseResponse.err);
      } else {
        setExpensesData(expenseResponse);
        localStorage.setItem('expensesData', JSON.stringify(expenseResponse));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error or set default values
    }
  };

  // globalContext will be initialized when :-
  // 1) component mounts, 2) change in cookie(new user) 3) change in incomesData, expensesData (form any location(like imcomes.js etc))
  useEffect(() => {
    fetchData();
  }, []); // Run on component mount

  useEffect(() => {
    // Fetch data again when the user logs in
    if (cookie.token) {
      fetchData();
    }
  }, [cookie.token]); // Run when token changes (user logs in)

  // Calculate total income and expense
  useEffect(() => {
    let totalIncome = 0;
    incomesData.forEach((incomeObj) => {
      totalIncome += incomeObj.amount;
    });
    setTotalIncomeAmount(totalIncome);

    let totalExpense = 0;
    expensesData.forEach((expenseObj) => {
      totalExpense += expenseObj.amount;
    });
    setTotalExpenseAmount(totalExpense);
  }, [incomesData, expensesData]);

  console.log(totalIncomeAmount);

// -------------------------------------------------------------------
  
    return (
      <div className="App">

        {
          cookie.token?(
            // Routes for logged in users only
            // only logged in routes will have access to all the global context data
            <globalContext.Provider value={{incomesData, setIncomesData, expensesData, setExpensesData,totalIncomeAmount ,totalExpenseAmount}}>
                <BrowserRouter>
                  <Routes>
                      <Route path="/dashboard" element={<Dashboard/>}/>
                      <Route path="/incomes" element={<Incomes/>}/>
                      <Route path="/transactions" element={<Transactions/>}/>
                      <Route path="/expenses" element={<Expenses/>}/>
                      <Route path="*" element={<Navigate to="/dashboard"/>}/>
                  </Routes>
                </BrowserRouter>
            </globalContext.Provider>
          ):(
            // Routes that can be accessed only bt for non logged in users 
            <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="*" element={<Navigate to="/login"/>}/> {/* if user tries to access any other route he will be redirected to login again */}
            </Routes>
          </BrowserRouter>
          )
        }
        
          
      </div>
    );
}

export default App;

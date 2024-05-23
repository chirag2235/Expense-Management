import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Dashboard from './routes/Dashboard';
import Incomes from './routes/Incomes';
import More from './routes/More';
import Expenses from './routes/Expenses';
import { useCookies } from 'react-cookie';
import { useContext, useEffect, useState } from 'react';
import globalContext from './contexts/globalContext';
import { makeAuthenticatedGETRequest } from './utils/serverHelpers';
import LandingPage from './routes/LandingPage';
import Admin from './routes/Admin';

function App() {

    // react cookies
    const [cookie, setCookie, deleteCookie] = useCookies(["token"]);
    
  // -------------Global Context initialization and updation --------------

    // we can directly fetch context data in App.js (we do not need to use useContext() in App.js to fetch the context values)
    // note : in App.js we define which routes can access context values and which routes can not, to allow specific routes and their childs to access context values wrap them in 'contextName.Provider' tag 
    // initializing Global Context data 
    const [userData, setUserData] = useState("");
    const [incomesData, setIncomesData] = useState([]);  // it will have array of income objects
    const [expensesData, setExpensesData] = useState([]);
    const [totalIncomeAmount, setTotalIncomeAmount] = useState("");
    const [totalExpenseAmount, setTotalExpenseAmount] = useState("");

    // this function is used to initialize or update the globalContext states
    // it fetches data from backend whever called then stores them to localstorage (to deal with internet issue cases)
    const fetchData = async() => {

        // fetch user data and set it to global context
        const userDataResponse = await makeAuthenticatedGETRequest('/api/user/me');
        if(userData.err){
          alert(userData.err);
        }
        else{
          setUserData(userDataResponse);
          localStorage.setItem('userData', JSON.stringify(userDataResponse)); // usefull for internet issues since localStorage is algo globally accessible
        }

        // fetch income and set it to global context
        const incomeResponse = await makeAuthenticatedGETRequest('/api/income/my-incomes');
        if(incomeResponse.err){
          alert(incomeResponse.err);
        }
        else{ 
          setIncomesData(incomeResponse);
          localStorage.setItem('incomesData', JSON.stringify(incomeResponse));
        }

        // fetch expense and set it to global context
        const expenseResponse = await makeAuthenticatedGETRequest('/api/expense/my-expenses');
        if(expenseResponse.err){
           alert(expenseResponse.err);
        }
        else{
          setExpensesData(expenseResponse);
          localStorage.setItem('expensesData', JSON.stringify(expenseResponse));
        }
    } 

    
      // reinitialize globalContext when component mounts
      useEffect(()=>{
          fetchData();
      },[]);
      
      // reinitialize globalContext when there is change in token (like new user logs in or something)
      useEffect(()=>{
        if(cookie.token){
          fetchData();
        }
      },[cookie.token]);
 
      // finding totalIncomeAmount, totalExpenseAmount whever there is a change in values of incomesData and expensesData
      useEffect(()=>{
          
          let totalIncome = 0;// calculate totalIncome
          incomesData.forEach((incomeObj) => {
            totalIncome += incomeObj.amount;
          })
          setTotalIncomeAmount(totalIncome);
          
          let totalExpense = 0;// calculate totalExpense
          expensesData.forEach((expenseObj) => {
            totalExpense += expenseObj.amount;
          })
          setTotalExpenseAmount(totalExpense);
      },[incomesData, expensesData])

      // note : do not call use state for dependencies [incomesData] and [expensesData] other wise the backend API calling will go to infinite loop

// -------------------------------------------------------------------
  
    return (
      <div className="App">

        {
          cookie.token?(
            // Routes for logged in users only
            // only logged in routes will have access to all the global context data
            <globalContext.Provider value={{userData, setUserData, incomesData, setIncomesData, expensesData, setExpensesData,totalIncomeAmount ,totalExpenseAmount}}>
                <BrowserRouter>
                  <Routes>
                      <Route path="/dashboard" element={<Dashboard/>}/>
                      <Route path="/incomes" element={<Incomes/>}/>
                      <Route path="/more" element={<More/>}/>
                      <Route path='/admin' element={<Admin/>}/>
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
                <Route path="/" element={<LandingPage/>}/>
                
                <Route path="*" element={<Navigate to="/login"/>}/> {/* if user tries to access any other route he will be redirected to login again */}
            </Routes>
          </BrowserRouter>
          )
        }
        
          
      </div>
    );
}

export default App;

import {createContext} from 'react';

const globalContext = createContext({
    userData:null,
    setUserData: () => {},
    incomesData: null,
    setIncomesData: (incomesData) => {},
    expensesData: null,
    setExpensesData: () => {},
    totalIncomeAmount: null,
    setTotalIncomeAmount: () => {},
    totalExpenseAmount: null,
    setTotalExpenseAmount: () => {}, 
})
 

export default globalContext;





 
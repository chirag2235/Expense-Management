import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const DynamicChart = () => {
   // Sample income and expense data
   const incomeData = [1000, 1500, 2000, 2500];
   const expenseData = [500, 700, 800, 1000];

   const data = {
       labels: ['January', 'February', 'March', 'April'],
       datasets: [
           {
               label: 'Income',
               data: incomeData,
               backgroundColor: 'rgba(75, 192, 192, 0.2)', // Green color for income
               borderColor: 'rgba(75, 192, 192, 1)',
               borderWidth: 1
           },
           {
               label: 'Expense',
               data: expenseData,
               backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red color for expenses
               borderColor: 'rgba(255, 99, 132, 1)',
               borderWidth: 1
           }
       ]
   };

   const options = {
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero: true
               }
           }]
       }
   };

   return (
       <div className='h-full w-full'>
           <h2>Dynamic Chart</h2>
           <Bar data={data} options={options} />
       </div>
   );
}

export default DynamicChart;
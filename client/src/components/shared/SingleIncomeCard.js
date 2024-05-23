// this is the single income card component used in the income tab 

import { makeAuthenticatedPOSTRequest } from "../../utils/serverHelpers";
import {Icon} from '@iconify/react';
import '../../styles/singleIncomeCard.css';
import React from 'react';


const SingleIncomeCard = React.memo(({incomeId, title, amount, date, description, category}) => {

    // an object that stores category to its iconify icon name (to fetch it from iconify)
    const categoryToIcon = {
        Salary:"teenyicons:money-solid",
        Freelancing:"dashicons:money",
        Investments:"streamline:investment-selection-solid",
        Stocks : "icon-park-solid:stock-market",
        Bitcoin:"icon-park-solid:bitcoin",
        "Bank Transfer":"bxs:bank",
        Youtube:"mingcute:youtube-fill",
        Other:"material-symbols-light:other-admission-rounded"
    }

    // this func gets incomeId in parameter and deleted that particular incomeCard
    const deleteIncome = async (incomeId) => {
        //    /api/income/delete-income/:incomeId
        const response = await makeAuthenticatedPOSTRequest("/api/income/delete-income/" + incomeId); 
        if(response.err){
            alert(response.err);
        }
        else{
            alert(`${title} income deleted`);
            window.location.reload();
        }
    }

    //func for converting 'date' js recieved obj into dd/mm/yyyy format string
    // note : the format we recieve date is in a js obj but in string type "2024-02-10T13:49:44.000Z" so we need to convert this to date obj like 2024-02-10T13:49:44.000Z then we apply the process to convert it in a dd/mm/yyyy formate
    const dateFormatter = (date) => { 
        var incomeCreationDate = new Date(date);
        var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        var formattedDate = incomeCreationDate.toLocaleDateString('en-GB', options);
        return formattedDate;
    }
    const formattedDate = dateFormatter(date);


    return(
        <div className='single-income-card-div w-full border border-white bg-white flex items-center py-3 px-3 rounded-2xl space-x-4 shadow-lg hover:shadow-lg hover:border-green-600' >
            
            {/* category is lets say Salary so it will fetch icon from the array and pass it*/}
            <div className='h-full'>  
                <Icon icon={categoryToIcon[category]} fontSize={45} className='category-icon h-full text-gray-700'/>
            </div>

            <div className='w-4/5 space-y-2'>

                <div className=' w-full flex items-center space-x-2 '>
                    <Icon icon="icon-park-outline:dot" fontSize={23} className='text-green-600'/>
                    <div className='font-semibold text-lg'>{title}</div>
                </div>

                <div className=' w-full flex items-center space-x-9 text-sm'>
                    <FinancialIconText text={amount} iconSrc={"bx:rupee"}/>  
                    <FinancialIconText text={formattedDate} iconSrc={"uim:calender"}/>
                    <FinancialIconText text={description} iconSrc={"material-symbols:comment"}/>
                    {/* <div className=''> {category} </div> */}
                </div>
            </div>

            <div className='w-1/6 flex justify-end px-3' >
                <Icon 
                    icon="mdi:delete-circle" 
                    fontSize={40} 
                    className='text-red-700 cursor-pointer'
                    onClick={()=>{ // delete that particular income from db as soon as user clicks on that delete icon for that income
                        deleteIncome(incomeId);
                        // alert(`delete icon for id ${incomeId}`);
                    }}
                />
            </div>
        </div>
    )
})

const FinancialIconText = ({text, iconSrc}) => {

    return(
        <div className='flex justify-center items-center space-x-2'> 
            <Icon icon={iconSrc} fontSize={22} className='text-gray-600'/>
            <div className='text-sm font-semibold'>{text}</div>
        </div>
    )
}


export default SingleIncomeCard;
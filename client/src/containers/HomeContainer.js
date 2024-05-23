import '../styles/home.css';
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import React, { useEffect, useState ,useContext} from 'react';
import globalContext from '../contexts/globalContext';
export default function HomeContainer({ children, currActiveScreen }) {
    const [cookie, setCookie, deleteCookie] = useCookies(["token"]);
    const {userData} = useContext(globalContext);
    const isAdmin = userData.firstName === 'admin'; // Check if cookie exists before accessing its properties
    console.log("isAdmin:", isAdmin); // Add this console log for debugging
    
    
    // if (!cookie || !cookie.token) { // Check if cookie or token is not present
    //     return <Navigate to="/login" replace />;
    // }

    return (
        <div className="h-full w-full flex  bg-gradient-to-r from-blue-300 to-blue-600">
            <div className="home-left bg-[#161616]">
                <div className="home-left-inner bg-white h-full w-full bg-opacity-60">
                    <div className='w-full flex justify-start items-center space-y-2 py-6 px-6 mb-4 '>
                        <div className='h-[45px] text-2xl text-yellow-200'>
                            <img className='h-full' src={'https://i.ibb.co/CWtQYjz/logo-1.png'} />
                        </div>
                    </div>
                    <IconText
                        iconSrc={"fluent-mdl2:b-i-dashboard"}
                        text={"Dashboard"}
                        active={currActiveScreen === "dashboard"}
                        targetLink={'/dashboard'}
                    />
                    <IconText
                        iconSrc={"solar:money-bag-bold"}
                        text={"Incomes"}
                        active={currActiveScreen === "incomes"}
                        targetLink={'/incomes'}
                    />
                    <IconText
                        iconSrc={"solar:cash-out-bold"}
                        text={"Expenses"}
                        active={currActiveScreen === "expenses"}
                        targetLink={'/expenses'}
                    />
                    {isAdmin && (
                        <IconText
                            iconSrc={"material-symbols:person"}
                            text={"Admin"}
                            active={currActiveScreen === "admin"}
                            targetLink={'/admin'}
                        />
                    )}
                    <IconText
                        iconSrc={"material-symbols:more"}
                        text={"More"}
                        active={currActiveScreen === "more"}
                        targetLink={'/more'}
                    />
                    
                    <div className='h-[40%] flex items-end pb-5'>
                        <div className='cursor-pointer' onClick={() => {
                            deleteCookie('token');
                        }}>
                            <IconText
                                iconSrc={"ri:logout-circle-r-line"}
                                text={"Log out"}
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='home-right'>
                <div className="w-full home-right-inner bg-[#eae9f4] h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import '../styles/login.css';
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import { useCookies } from "react-cookie";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import {Icon} from '@iconify/react'

const Login = () => {

    // imp useStates
    const navigate = useNavigate();
    const [cookie, setCookie, deleteCookie] = useCookies(["token"]);
    
    // store the data locally 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // state to know when to show the loading icon during data fetching
    const [showLoading, setShowLoading] = useState(false);

    // when user clicks on login btn 
    // when user clicks on signup btn this func will run
    const loginFunc = async () => {

        setShowLoading(true);

        // collecting user data from states and sending it to backend API connector for backend connection
        const body = {email, password}; 
        const response = await makeUnauthenticatedPOSTRequest('/api/auth/login', body);

        if(response.err){ // some error from backend 
            setShowLoading(false);
            alert(response.err);
            return;
        }
        else{ // user logged in, store the token to the cookies
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30); // 30 days later date (token expiration)
            setCookie("token", token, {path: "/" ,expires: date}); // to store token in cookies we need to install "npm i react-cookie" package, using this "setCookies(key, value, {options})" we can set cookies, note: path is the cookies path where to store it
            setShowLoading(false);
            alert("Logged In!")
            if (response.firstName === "admin") {
                navigate("/admin"); // Redirect admin to admin dashboard
            } else {
                navigate("/dashboard"); // Redirect normal user to home page
            }
        }
    }


    return(
      <div className='login-container'>

        {/* left part (svg) */}
          <div className='login-left-part'>
              {/* for image */}
              <div className='login-left-image-container'></div> 
          </div>

        {/* right part */}
          <div className='login-right-part'>

            <div className="py-5 space-y-2">
                <div className="text-3xl font-bold">WELCOME BACK </div>
                <div className="text-gray-800 text-lg">Enter your details to Login</div>
            </div>

            <div className="w-full flex justify-center py-5 ">
                
                <div className="input-fields-container space-y-5">

                    <TextInput 
                        label={"Email"} 
                        placeholder={"Enter your email"}
                        value={email}
                        setValue={setEmail}
                    />
                    <PasswordInput 
                        label={"Password"} 
                        placeholder={"Enter your password"}
                        value={password}
                        setValue={setPassword}
                    />

                    <div className="bg-green-500 text-black py-3  rounded cursor-pointer text-lg font-semibold hover:bg-green-400" onClick={()=>{
                        loginFunc();
                    }}>
                        Login  
                    </div>
                    <div className="flex justify-center space-x-2" >
                        <div className="text-lg" >
                            Don't have an account?
                        </div>
                        <div className="text-red-800 text-lg font-semibold cursor-pointer hover:underline " onClick={()=>{
                            navigate("/signup");
                        }}>
                            Sign Up for free
                        </div>
                    </div>
                    {
                        showLoading?(  // show loading whenever value of showLoading is true
                            <div className="loading-div flex justify-center">
                                <Icon icon="eos-icons:bubble-loading" fontSize={40}/>
                            </div>  
                        ):(
                            <div></div>
                        )
                    }
                        

                </div>

            </div>

          </div>
      </div>
    )
}

// const LoadingIcon = () => {
//     return(
//         import React from 'react';
// import type { SVGProps } from 'react';

// export function EosIconsBubbleLoading(props: SVGProps<SVGSVGElement>) {
// 	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><circle cx={12} cy={2} r={0} fill="currentColor"><animate attributeName="r" begin={0} calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle></svg>);
// }
//     )
// } 
export default Login;


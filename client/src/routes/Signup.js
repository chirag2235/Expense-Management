import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import '../styles/signup.css';
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import {useCookies} from 'react-cookie'
import { Icon } from "@iconify/react";

const Signup = () => {

    // some imp react use states
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);// npm install react-cookie

    // store the data locally 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    // state to know when to show the loading icon during data fetching
    const [showLoading, setShowLoading] = useState(false);

    const isValidEmail = (email) => {
        // email regex pattern
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        // Checkinf if the email matches the pattern
        return emailPattern.test(email);
    }

    // when user clicks on signup btn this func will run
    const signUpFunc = async () => {
        
        // some validations
        if(email.trim() === "" || password.trim() === "" || firstName.trim() === "" || lastName.trim() === ""){
            alert("all fields are required");
            return;
        }
        if(isValidEmail(email) === false){
            alert("Invalid Email address");
            return;
        }
        if(password.length < 7){
            alert("Password must have atleast 8 characters");
            return
        }

        setShowLoading(true);

        // collecting user data from states and sending it to backend API connector for backend connection
        const body = {email, password, firstName, lastName}; 
        const response = await makeUnauthenticatedPOSTRequest('/api/auth/signup', body);

        if(response.err){ // some error from backend 
            setShowLoading(false);
            alert(response.err);
            return;
        }
        else{ // user created, store the token to the cookies
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30); // 30 days later date (token expiration)
            setCookie("token", token, {path: "/" ,expires: date}); // to store token in cookies we need to install "npm i react-cookie" package, using this "setCookies(key, value, {options})" we can set cookies, note: path is the cookies path where to store it
            setShowLoading(false);
            alert("Account created!")
            navigate("/home");
        }
    }

    return(
      <div className='signup-container'>
          <div className='signup-left-part'>
              {/* for image */}
              <div className='signup-left-image-container'></div> 
          </div>

          <div className='signup-right-part'>

            <div className="space-y-1">
                <div className="text-3xl font-bold">Create New Account</div>
                <div className="text-gray-800 text-lg">Enter your details</div>
            </div>

            <div className="w-full flex justify-center py-3 ">
                
                <div className="input-fields-container space-y-2">

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
                    <TextInput 
                        label={"First Name"} 
                        placeholder={"Enter your first name"}
                        value={firstName}
                        setValue={setFirstName}
                    />
                    <TextInput 
                        label={"Last Name"} 
                        placeholder={"Enter your last name"}
                        value={lastName}
                        setValue={setLastName}
                    />

                    <div className="bg-green-500 text-black py-3  rounded cursor-pointer text-lg font-semibold hover:bg-green-400 " onClick={()=>{
                        signUpFunc();
                    }}>
                        Sign Up  
                    </div>
                    <div className="flex justify-center space-x-2" >
                        <div className="text-lg" >
                            Already have an account ?
                        </div>
                        <div className="text-red-800 text-lg font-semibold cursor-pointer hover:underline " onClick={()=>{
                            navigate("/login");
                        }}>
                            Login Here
                        </div>
                    </div>
                    <div className="w-full ">
                        {
                            showLoading?( // show loading whenever value of showLoading is true
                                <div className="loading-div flex justify-center">
                                    <Icon icon="eos-icons:bubble-loading" fontSize={40}/>
                                </div>
                            ):
                            (// else show this
                                <div></div>
                            )
                        }
                    </div>
                </div>
            </div>

          </div>
      </div>
    )
}

export default Signup;
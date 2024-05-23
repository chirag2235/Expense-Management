import styled from 'styled-components';
import '../styles/landingPage.css';
import {Icon} from '@iconify/react';
import {useNavigate} from 'react-router-dom';


const LandingPage = () => {

    const navigate = useNavigate([]);

    return(
            // 11 + 80 + 9
            <div className="landingPage-container h-full w-full ">

                <div className=' h-[11%] flex justify-center pt-4'>
                    <img className='h-full' src={'https://i.ibb.co/CWtQYjz/logo-1.png'}/>
                </div>

                <div className='info-main-container h-[80%] w-full px-10 '>
                    <div className='text-white w-full pt-20 text-[#fefae0]'>
                        <div className='info-heading text-[#fefae0] w-full text-5xl font-bold text-left'> 
                            TrackTreasury 
                        </div>
                        <div className='w-full py-5'>
                            <div className='info-container text-left text-[#fefae0]  text-xl text-opacity-80'>
                                is a <span className='font-semibold text-white'> finance management</span>  web application build for you to take control of your finances, a place where income and expenses meet simplicity, providing you the insight you need to thrive.
                            </div>
                        </div>
                        <div className='w-full flex space-x-5'>
                            <div className='login-btn cursor-pointer bg-white py-3 text-lg text-black px-8 font-bold rounded-full hover:bg-opacity-80 ' onClick={()=>{
                                navigate("/login");
                            }}>
                                Log In
                            </div>
                            
                            <div className='signup-btn cursor-pointer font-semibold  bg-white bg-opacity-10 bg-transparent text-lg border border-white text-white py-3 px-8 rounded-full hover:bg-opacity-30' onClick={()=>{
                                navigate("/signup");
                            }}>
                                Sign Up
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='footer text-left px-10 py-2 text-gray-500'>
                </div>


            </div>
    )
}

export default LandingPage;

// const StyledComponent = styled.div`
//     height:100%;
//     width:100%;
//     //background-image: url('https://i.ibb.co/RSDHRNs/Pngtree-dark-green-cyan-paper-cut-1225583.jpg');
//     background-image: url(${landingPageBg})
//     background-repeat: no-repeat;
//     background-size: cover;
//     // background-color: #283618;

//     // background: linear-gradient(180deg, rgba(21,22,24,1) 0%, rgba(76,81,82,1) 100%, rgba(0,212,255,1) 100%);

// `
import { Link } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';
import {Icon} from '@iconify/react';

export default function More({}){
    return(
        <HomeContainer currActiveScreen={"more"}>
            
                    {/* single card's container */}
                    <div className='w-full h-full space-y-4 overflow-auto px-5 py-6'>
                
                        <div className='text-left text-gray-700 '> 
                            <div className='font-bold text-2xl '>Want to customise this app for your use ?</div>
                            <div className='font-semibold'>Get the complete source code from github</div>
                        </div>
                        <SingleMoreCard
                            title={'Github'}
                            linkTitle={'Track-treasury'}
                            link={'https://github.com'}
                            iconifySrc="uiw:github"
                            underline
                        />

                        <div className='text-left text-gray-700 '> 
                            <div className='font-bold text-2xl '>Want to contact us?</div>
                            <div className='font-semibold'>We got u covered</div>
                        </div>
                        <div className='w-full space-y-3'>
                            <SingleMoreCard
                                title={'Mail Us'}
                                linkTitle={'expense@gmail.com'}
                                link={'expense@gmail.com'}
                                iconifySrc={'material-symbols:mail'}
                            />
                            <SingleMoreCard
                                title={'Linked In'}
                                linkTitle={'Profile Link'}
                                iconifySrc={'mdi:linkedin'}
                                link={'https://www.linkedin.com/'}
                            />
                            
                        </div>  
                    </div>

                    
        </HomeContainer>
    )
}

const SingleMoreCard = ({title, link, linkTitle,iconifySrc, underline}) => {
    return(
      <div className='w-full'>
            <div className='w-full shadow-lg rounded-lg bg-white px-5 py-5 flex items-center'>
            <div className='w-1/2 flex space-x-5 items-center ' >
                <Icon icon={iconifySrc} fontSize={40}/>
                <div className=' text-lg font-semibold text-gray-700'>
                    {title}
                </div>
            </div>
            <div className='h-full w-1/2 flex justify-end pr-3'>
                <div className='h-full flex space-x-2 text-lg '>
                    {/* <div>Link : </div> */}
                    <Link to={link}>
                        <div className={`font-semibold ${underline?('underline'):('')} text-blue-900`}>
                            {linkTitle}
                        </div>
                    </Link>
                </div>
            </div>
            </div>
        </div>  

    );
}
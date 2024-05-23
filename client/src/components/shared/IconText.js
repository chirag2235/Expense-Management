import { Icon } from '@iconify/react';
import {Link} from 'react-router-dom';

// all those side bar icons use this component 
const IconText = ({iconSrc, text, active, targetLink}) => {

    return(
        <Link to={targetLink} >
            <div className={`cursor-pointer w-full py-2 flex justify-left items-center px-6 space-x-3 delay-100 duration-100 ${active?('bg-[#303030] rounded-r-full'):('')}`}>
                <Icon icon={iconSrc} color={`${active?('white'):('gray')}`} className={`text-2xl`}/>
                <div className={`text-lg ${active?('text-white'):('text-gray-300')}`}>
                    {text}
                </div>
            </div>
        </Link>
    )
} 

export default IconText;
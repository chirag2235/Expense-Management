import DatePicker from 'react-datepicker';
import {useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({placeholder, value, setValue}) => {

    const [startDate, setStartDate] = useState(new Date());

    return(
        <div className='border-2 border-white bg-white shadow-lg rounded'>
            <DatePicker 
                className='outline-none bg-white py-2 w-full rounded px-2' 
                // className='border border-gray-400 py-2 w-full rounded px-2' 
                placeholderText={startDate}
                selected={startDate} 
                value={new Date()} 
                onChange={
                    (date) =>{ 
                        setStartDate(date)
                        setValue(date);
                    }
                } 
                
            />
        </div>
    )
}

export default DateInput;



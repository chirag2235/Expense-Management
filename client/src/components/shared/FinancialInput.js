// for the income and expense fields 

export default function FinancialInput({placeholder, value, setValue, type="text"}){ // by default if no type is provided it will have value "text"

    return(
        <div className="w-full flex flex-col text-left bg-white rounded shadow-lg">
            <input 
                type={type} 
                placeholder={placeholder}
                // className="border border-gray-400 bg-opacity-30 rounded py-2 px-2 outline-none"
                className="border-2 border-white rounded placeholder-gray-500 bg-transparent rounded py-2 px-2 outline-none"
                value={value} // input fields value will be send to the value of state from where this component is called 
                onChange={(e)=>{
                    setValue(e.target.value)  // whenever there is change in value of input field, send it to the state asap
                }}
            />
        </div>
    )
}
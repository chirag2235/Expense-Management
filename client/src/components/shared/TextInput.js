// for the login and signup fields 

export default function TextInput({label, placeholder, value, setValue}){

    return(
        <div className="w-full flex flex-col text-left space-y-2">
            <label className="text-xl font-semibold">{label}</label>
            <input 
                type="text" 
                placeholder={placeholder}
                className="border border-gray-800 rounded py-3 px-2 placeholder-black"
                value={value} // input fields value will be send to the value of state from where this component is called 
                onChange={(e)=>{
                    setValue(e.target.value)  // whenever there is change in value of input field, send it to the state asap
                }}
            />
        </div>
    )
}



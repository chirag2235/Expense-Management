
const TextAreaInput = ({rows=2, placeholder, value, setValue}) => {
    return(
        <textarea
            className='border-2 border-white  bg-white placeholder-gray-500 w-full px-2 py-2  outline-none rounded shadow-lg'
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={(e)=>{
                setValue(e.target.value);
            }}
        />
    )
}

export default TextAreaInput;
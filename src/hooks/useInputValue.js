import { useState } from "react";

function useInputValue(initial_value = ''){

    const [getValue, setValue] = useState(initial_value);

    const onChange = (e) =>{
        setValue(e.target.value)
    }    

    return{
        getValue,
        onChange
    }
}

export {useInputValue}
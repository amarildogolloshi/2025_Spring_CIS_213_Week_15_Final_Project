import { useState } from "react";

function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    /** 
    * Updates the value state to a new value.
    * @param {string} newValue - The new value of the input
    */
    function handleUpdateValue(newValue) {
        setValue(newValue);
    }

    /**
     * Updates the error state (negates the boolean state value) and errorMessage state.
     * @param {string} errMsg - The error message. Default empty string.
     */
    function handleUpdateError(errMsg="") {
        // Flip error state
        setError(prevError => !prevError);
        // Always update errorMessage
        setErrorMessage("*" + errMsg);
    }

    return [{value, handleUpdateValue}, {error, handleUpdateError, errorMessage}]
}

export default useInput;
import { useState } from "react";

function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    /** 
    * Updates the value state to a new value.
    * @param {string | string[]} newValue - The new value of the input
    */
    function handleUpdateValue(newValue) {
        setValue(newValue);
    }

    /**
     * Updates the error state (negates the boolean state value) and errorMessage state.
     * @param {string} errMsg - (Optional) The error message. Default empty string.
     * @param {boolean} updateMsgOnly - (Optional) Forces an update only 
     *                          on errorMessage (persists a true error state). Default false. 
     */
    function handleUpdateError(errMsg="", updateMsgOnly=false) {
        if (updateMsgOnly) {
            // If updating error message only, error state should be true
            setError(true);
        } else {
            // Flip error state
            setError(prevError => !prevError);
        }
        // Always update errorMessage
        setErrorMessage("*" + errMsg);
    }

    return [{value, handleUpdateValue}, {error, handleUpdateError, errorMessage}]
}

export default useInput;
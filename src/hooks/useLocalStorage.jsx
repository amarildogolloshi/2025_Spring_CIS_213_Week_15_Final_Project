import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
    
    const [storedValue, setStoredValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const removeValue = () => {
        localStorage.removeItem(key);
    };

    return [storedValue, setValue, removeValue];
}

export default useLocalStorage;

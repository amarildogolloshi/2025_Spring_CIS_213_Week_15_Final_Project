import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
    // Retrieve stored value from localStorage or use initialValue
    const [storedValue, setStoredValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    // Update localStorage whenever storedValue changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;

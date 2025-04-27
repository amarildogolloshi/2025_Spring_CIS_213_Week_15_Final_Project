import React, { useState, useEffect } from "react";
import styles from "./DynamicMessage.module.css";

function DynamicMessage({ type = "success", message, autoClose = true, duration = 3000 }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => setIsVisible(false), duration);
            return () => clearTimeout(timer); // Cleanup timeout
        }
    }, [autoClose, duration]);

    const handleClose = () => setIsVisible(false);

    return (
        isVisible && (
            <div className={`${styles.message} ${styles[type]}`}>
                <span>{message}</span>
                <button className={styles.closeButton} onClick={handleClose}>×</button>
            </div>
        )
    );
}

export default DynamicMessage;

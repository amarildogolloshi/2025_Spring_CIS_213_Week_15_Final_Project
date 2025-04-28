import { useEffect, useState } from "react";
import styles from "./RechartsPanel.module.css";
import { FaTimes } from "react-icons/fa";
import ContactForm from "../ContactForm/ContactForm";
import FaqList from "../FaqList/FaqList";

const RechartsPanel = ({ children, isOpen = false, setOpenPanel }) => {
    const [activePanel, setActivePanel] = useState(isOpen); 

    console.log("activePanel: " + activePanel)

    useEffect(() => {
        setActivePanel(isOpen); 
    }, [isOpen]);

    function closePanel() {
        setActivePanel(false); 
        setOpenPanel({ isOpen: false, chartData: []}); 
    }

    return activePanel ? (
        <div className={styles.overlay} onClick={closePanel}>
            <div className={`${styles.panel} ${styles["panel-active"]}`} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closePanel}><FaTimes /></button>
                {
                    children
                }
            </div>
        </div>
    ): null;
    
};

export default RechartsPanel;

import { useState } from "react";
import styles from "./SupportPanel.module.css";
import { FaTimes } from "react-icons/fa";
import ContactForm from "../ContactForm/ContactForm";
import FaqList from "../FaqList/FaqList";

const SupportPanel = ({ activePanel, closePanel, faqData }) => {
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setExpandedFAQ(expandedFAQ === index ? null : index); // Toggle visibility
    };

    if (!activePanel) return null; // Don't render if no panel is active

    return activePanel ? (
        <div className={styles.overlay} onClick={closePanel}>
            <div className={`${styles.panel} ${styles["panel-active"]}`} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closePanel}><FaTimes /></button>
                {activePanel === "report" && <ContactForm messageType="report" />}
                {activePanel === "feature" && <ContactForm messageType="feature" />}
                {activePanel === "faq" && <FaqList faqData={faqData} />} {/* Ensure FAQ renders correctly */}
                {activePanel === "contact" && <ContactForm messageType="general" />}
            </div>
        </div>
    ) : null;
    
};

export default SupportPanel;

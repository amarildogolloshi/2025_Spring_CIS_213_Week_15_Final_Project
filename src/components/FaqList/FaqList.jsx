import { useState } from "react";
import styles from "./FaqList.module.css";

const FaqList = ({ faqData }) => {
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setExpandedFAQ(expandedFAQ === index ? null : index); // Toggle answer visibility
    };

    return (
        <div className={styles.faqContainer}>
            <h2>Frequently Asked Questions</h2>
            <ul>
                {faqData.map((faq, index) => (
                    <li key={index} className={styles.faqItem}>
                        <button onClick={() => toggleFAQ(index)} className={styles.faqButton}>
                            {faq.question} {expandedFAQ === index ? "▲" : "▼"}
                        </button>
                        {expandedFAQ === index && <p>{faq.answer}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FaqList;

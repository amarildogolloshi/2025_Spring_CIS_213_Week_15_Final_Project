import { useState } from "react";
import styles from "./FaqList.module.css";

const FaqList = () => {
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const faqData = [
        { question: "How do I reset my password?", answer: "Go to the account settings page and click 'Reset Password'." },
        { question: "How can I contact support?", answer: "Use the contact form or email us at support@pulse.com." },
        { question: "Where can I find the privacy policy?", answer: "You can view the privacy policy under 'Settings > Privacy'." },
    ];

    return (
        <div className={styles.faqContainer}>
            <ul>
                {faqData.map((faq, index) => (
                    <li key={index} className={styles.faqItem}>
                        <p className={styles.question}>{faq.question}</p>
                        <p className={styles.answer}>{faq.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FaqList;

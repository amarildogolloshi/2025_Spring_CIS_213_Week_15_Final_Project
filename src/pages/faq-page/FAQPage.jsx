import { useState } from "react";
import PublicLayout from "../../components/public/PublicLayout";
import styles from "./FAQPage.module.css";

import { FaExclamationCircle, FaLightbulb, FaQuestionCircle, FaPhoneAlt } from "react-icons/fa";
import SupportPanel from "../../components/SupportPanel/SupportPanel";
import { Link } from "react-router-dom";
import FaqList from "../../components/FaqList/FaqList";

const faqData = [
    { question: "How do I reset my password?", answer: "Go to the account settings page and click 'Reset Password'." },
    { question: "How can I contact support?", answer: "Use the contact form or email us at support@pulse.com." },
    { question: "Where can I find the privacy policy?", answer: "You can view the privacy policy under 'Settings > Privacy'." },
];

function FAQPage() {
    
    return (
        <PublicLayout>
            <section className={styles.faq}>
                <h1>Frequently Asked Questions</h1>
                <FaqList/>

            </section>
        </PublicLayout>
    );
}

export default FAQPage;

import { useState } from "react";
import PublicLayout from "../../components/public/PublicLayout";
import styles from "./Support.module.css";

import { FaExclamationCircle, FaLightbulb, FaQuestionCircle, FaPhoneAlt } from "react-icons/fa";
import SupportPanel from "../../components/SupportPanel/SupportPanel";

const faqData = [
    { question: "How do I reset my password?", answer: "Go to the account settings page and click 'Reset Password'." },
    { question: "How can I contact support?", answer: "Use the contact form or email us at support@pulse.com." },
    { question: "Where can I find the privacy policy?", answer: "You can view the privacy policy under 'Settings > Privacy'." },
];

function Support() {
    const [activePanel, setActivePanel] = useState(null);

    return (
        <PublicLayout>
            <section className={styles.support}>
                <h1>Support</h1>

                {/* Support Options */}
                <div className={styles["support-box-container"]}>
                    <div className={styles["support-box"]}>
                        <div className={styles["header"]}>
                            <FaExclamationCircle size={30} />
                            <h2> Report a Problem</h2>
                        </div>
                        
                        <p>Encountering an issue? Let us know!</p>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActivePanel("report"); }}>Submit a Report</a>
                    </div>

                    <div className={styles["support-box"]}>
                        <div className={styles["header"]}>
                            <FaLightbulb size={30} />
                            <h2> Request a Feature</h2>
                        </div>
                        <p>Have ideas to improve Pulse? Share them!</p>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActivePanel("feature"); }}>Request a Feature</a>
                    </div>

                    <div className={styles["support-box"]}>
                        <div className={styles["header"]}>
                            <FaQuestionCircle size={30} />
                            <h2> Frequently Asked Questions</h2>
                        </div>
                        <p>Find answers to common questions.</p>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActivePanel("faq"); }}>Visit FAQ</a>
                    </div>

                    <div className={styles["support-box"]}>
                        <div className={styles["header"]}>
                            <FaPhoneAlt size={30} />
                            <h2> Contact Us</h2>
                        </div>
                        
                        <p>Need direct assistance? Reach out to our team.</p>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActivePanel("contact"); }}>Get in Touch</a>
                    </div>
                </div>

                {/* Support Panel Component */}
                <SupportPanel activePanel={activePanel} closePanel={() => setActivePanel(null)} faqData={faqData} />
            </section>
        </PublicLayout>
    );
}

export default Support;

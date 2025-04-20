import ContactForm from "../ContactForm/ContactForm";
import ContactInfo from "../ContactInfo/ContactInfo";
import ContactSocialNetwork from "../ContactSocialNetwork/ContactSocialNetwork";
import styles from "./Contact.module.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Contact() {
    return (
        <>
            <section id="contact" className={styles.section}>
                <h1 className={styles.h1}>Contact</h1>
            
                <p className={styles.h2}>Get in touch with us!</p>

                <div className={styles.contactContainer}>
                    <div className={styles.contactFormContainer}>
                        {/*  Contact Form */}
                        <ContactForm/>
                    </div>
                    <div className={styles.contactInfoContainer}>
                        {/*  Phone Number */}
                        <ContactInfo />

                        {/*  Social Media Links */}
                        <ContactSocialNetwork />
                    </div>
                </div>

                
            </section>
        </>
    );
}

export default Contact;
import ContactForm from "../ContactForm/ContactForm";
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
                        {/* <form className={styles.contactForm}>
                            <label>
                                Name:
                                <input type="text" name="name" placeholder="Enter your name" />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" placeholder="Enter your email" />
                            </label>
                            <label>
                                Message:
                                <textarea name="message" placeholder="Your message..."></textarea>
                            </label>
                            <button type="submit">Send Message</button>
                        </form> */}
                    </div>
                    <div className={styles.contactInfoContainer}>
                    {/*  Phone Number */}
                    <div className={styles.contactInfo}>
                        <p><strong>Phone:</strong> +1 (123) 456-7890</p>
                        <p><strong>Email:</strong> contact@pulse.com</p>
                        <p><strong>Address:</strong> 123 Pulse Street, City, Country</p>
                    </div>

                        

                        {/* 🌍 Social Media Links */}
                        <div className={styles.socialLinks}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> <FaFacebook size={24} /></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> <FaInstagram size={24} /></a>
                        </div>
                    </div>
                </div>

                
            </section>
        </>
    );
}

export default Contact;
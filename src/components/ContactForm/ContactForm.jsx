import { useState } from "react";
import styles from "./ContactForm.module.css";

function ContactForm({messageType = "general"}) {
    const [formData, setFormData] = useState({ name: "", email: "", type: messageType, message: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
        if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Form submitted:", formData);
            alert("Message sent successfully!");
        }
    };
    return (
        <div className={styles.contactFormContainer}>
            {/*  Contact Form */}
            <form className={styles.contactForm} onSubmit={handleSubmit}>
                <div className={styles["hidden"]}>
                    <label> Message Type:</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                            <option value="general">General Inquiry</option>
                            <option value="feature">Feature Request</option>
                            <option value="report">Report a Problem</option>
                    </select>
                </div>
                <div className={styles["form-group"]}>
                    <label>Name:</label>
                    <input type="text" name="name" placeholder="Enter your name" />
                </div>

                <div className={styles["form-group"]}>
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Enter your email" />
                </div>
                
                <div className={styles["form-group"]}>
                    <label>Message:</label>
                    <textarea name="message" placeholder="Your message..."></textarea>
                </div>
                <div className={styles["form-group"]}>
                    <button type="submit">Send Message</button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
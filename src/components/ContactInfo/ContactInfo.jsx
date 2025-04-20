import styles from "./ContactInfo.module.css";

function ContactInfo() {
    return (
        <div className={styles.contactInfo}>
            <p><strong>Phone:</strong> +1 (123) 456-7890</p>
            <p><strong>Email:</strong> contact@pulse.com</p>
            <p><strong>Address:</strong> 123 Pulse Street, City, Country</p>
        </div>
    );
}

export default ContactInfo;

import styles from "./ContactSocialNetwork.module.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function ContactSocialNetwork() {
    return (
        <div className={styles.socialLinks}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> <FaFacebook size={24} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> <FaInstagram size={24} /></a>
        </div>
    );
}

export default ContactSocialNetwork;
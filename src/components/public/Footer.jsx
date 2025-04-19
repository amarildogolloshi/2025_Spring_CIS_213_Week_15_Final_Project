import { Link } from "react-router";
import styles from "./Footer.module.css";
import Logo from "./Logo";

function Footer({ children }) {
    return (
        <footer className={styles["footer"]}>
            <Logo />
            <div  className={styles["footer-content"]}>
                <div className={styles["footer-copyright"]}>
                    <p>Pulse &copy; 2025</p>
                    <p>All rights reserved</p>
                </div>
                <div className={styles["footer-links"]}>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-and-conditions">Terms and Conditions</Link>
                </div>
            </div>
            {children}
        </footer>
    );
}

export default Footer;
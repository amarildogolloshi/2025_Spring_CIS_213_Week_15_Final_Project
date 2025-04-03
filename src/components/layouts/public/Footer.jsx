import styles from "./Footer.module.css";

function Footer({ children }) {
    return (
        <footer className={styles.footer}>
            <p>Pulse &copy; 2025 All Rights Reserved</p>
            {children}
        </footer>
    );
}

export default Footer;
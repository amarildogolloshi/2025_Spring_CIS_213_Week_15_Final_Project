import styles from "./Header.module.css";

function Header({ children }) {
    return (
        <header className={styles["header-fixed-top"]}>
            { children }
        </header>
    );
}

export default Header;
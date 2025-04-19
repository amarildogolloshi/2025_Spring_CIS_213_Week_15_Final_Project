import { Link } from "react-router-dom";
import regularlogo from "/images/logo.png";
import invertedlogo from "/images/logo-invert.png";
import styles from "./Logo.module.css";

const Logo = ({variant = "regular"}) => {
    const logoSrc = variant === "inverted" ? invertedlogo : regularlogo
    return (
            <Link className={styles.logo} to="/" aria-label="Go to Homepage">
                <img src={logoSrc} alt="Pulse Logo" className={variant} />
                <span className={styles[variant]}>Pulse</span>
            </Link>
    );
}

export default Logo;
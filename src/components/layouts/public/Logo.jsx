import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import styles from "./Logo.module.css";

const Logo = () => {
    return (
            <Link className={styles.logo} to="/">
                <img src={logo} alt="Pulse Logo" />
                Pulse
            </Link>
    );
}

export default Logo;
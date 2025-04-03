import { NavLink } from "react-router";
import styles from "./NavComponents.module.css";

function SignInNav() {
    const navLinks = [
        {to: "/", text: "Home", target: ""},
        {to: "/support", text: "Support", target: "_blank"},
        // {to: "/support", text: "Support"},
    ];

    return (
        <ul className={styles.ul}>
            { 
                // Sign In Navigation - Navigate to different pages
                navLinks.map((link) => (
                    <li key={link.to}>
                        <NavLink className={styles.navItem} to={link.to} target={link.target}>
                            {link.text}
                        </NavLink>
                    </li>
                ))
            }
        </ul>
    );
}

export default SignInNav;
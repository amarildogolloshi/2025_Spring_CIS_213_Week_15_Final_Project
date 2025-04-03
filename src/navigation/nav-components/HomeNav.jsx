import { NavLink } from "react-router";
import { HashLink } from "react-router-hash-link";
import styles from "./NavComponents.module.css";

function HomeNav() {
    const pageLinks = [
        {to: "#", text: "Home"},
        {to: "#about", text: "About"},
        {to: "#contact", text: "Contact"},
    ];

    return (
        <ul className={styles.ul}>
            { 
                // Home Page Navigation - Navigate on page
                pageLinks.map((link) => (
                    <li key={link.to}>
                        <HashLink className={styles.navItem} to={link.to}>
                            {link.text}
                        </HashLink>
                    </li>
                ))
            }
            <li>
                <NavLink className={styles.navBtn} to={"/signin"}>
                    Dashboard
                </NavLink>
            </li>
        </ul>
    );
}

export default HomeNav;
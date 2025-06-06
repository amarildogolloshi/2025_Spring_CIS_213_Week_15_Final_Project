import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styles from "./NavComponents.module.css";
import { Link, useLocation } from "react-router-dom";

function HomeNav() {
    const pageLinks = [
        {to: "home", text: "Home"},
        {to: "about", text: "About"},
        {to: "contact", text: "Contact"},
    ];


    const location = useLocation();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId.toLowerCase());
        if (element) {
            const offsetTop = element.offsetTop;
            window.scrollTo({
                top: offsetTop - 112, // 10rem = 160px (assuming 1rem = 16px)
                behavior: 'smooth'
            });
        }
    };

  // Handle navigation when on home page
  const handleClick = (e, sectionId) => {
    e.preventDefault();
    
    console.log(location.pathname)
    console.log(sectionId)
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      window.location.href = `/`;
    }
  };

    return (
        <ul className={styles.ul}>
            { 
                // Home Page Navigation - Navigate on page
                pageLinks.map((link) => (
                    <li key={link.to}>
                        <HashLink smooth className={styles.navItem} to={`#${link.to}`} onClick={(e) => handleClick(e, link.to)}>
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
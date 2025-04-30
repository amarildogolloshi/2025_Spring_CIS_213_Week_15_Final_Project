
import { useState } from "react";
import styles from "./Sidebar.module.css";
import { useMediaQuery } from "react-responsive";
import Hamburger from "hamburger-react";

function Sidebar({children}) {
    const [showNav, setShowNav] = useState(false);
    const isMobile = useMediaQuery({
        query: '(max-width: 600px)',
    });

    function handleNavBtn() {
        setShowNav(prevNav => !prevNav);
    }

    return (
        <>
        {isMobile ?
            
            showNav ?
            <div id="sidebar" className={styles.sidebar}>
                <button className={styles.closeNav} onClick={handleNavBtn}>X</button>
                {children}
            </div>
            :
            // <button className={styles.hamBtn} onClick={handleNavBtn}>Show Nav</button>
            <Hamburger className={styles.hamBtn} toggled={showNav} toggle={handleNavBtn} />

        :
            <div id="sidebar" className={styles.sidebar}>
                {children}
            </div>
        }
        </>

    );
}

export default Sidebar;
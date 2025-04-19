
import styles from "./Sidebar.module.css";

function Sidebar({children}) {
    return (
        <div id="sidebar" className={styles.sidebar}>
            {children}
        </div>
    );
}

export default Sidebar;
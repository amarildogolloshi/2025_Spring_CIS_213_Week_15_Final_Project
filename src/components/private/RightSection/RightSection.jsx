
import styles from "./RightSection.module.css";

function RightSection({children}) {
    return (
        <div id="right-section" className={styles["right-section"]}>
            {children}
        </div>
    );
}

export default RightSection;
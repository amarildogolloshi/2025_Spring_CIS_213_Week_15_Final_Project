import React from "react";
import PropTypes from "prop-types";
import styles from "./DashboardCard.module.css"; // Import the CSS module

const DashboardCard = ({ title, description, icon, onClick }) => {
    return (
        <div 
            className={styles.dashboardCard} // Use class from CSS module
            onClick={onClick}
        >
            <div className={styles.dashboardCardHeader}>
                {icon && <div className={styles.dashboardCardIcon}>{icon}</div>}
                <h3 className={styles.dashboardCardTitle}>{title}</h3>
            </div>
            <p className={styles.dashboardCardDescription}>{description}</p>
        </div>
    );
};

DashboardCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.node,
    onClick: PropTypes.func,
};

export default DashboardCard;

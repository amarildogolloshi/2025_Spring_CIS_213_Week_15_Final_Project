import styles from "./AboutValues.module.css";

function AboutValues() {
    return (
        <div className={styles.values}>
            <h2>Our Values</h2>
            <ul>
                <li>🚀 Innovation - We push the boundaries of creativity and technology.</li>
                <li>🤝 Collaboration - Great ideas come from teamwork.</li>
                <li>💡 Integrity - Transparency and honesty guide every decision we make.</li>
                <li>🌍 Community - We believe in giving back and making a positive impact.</li>
            </ul>
        </div>
    );
}

export default AboutValues;
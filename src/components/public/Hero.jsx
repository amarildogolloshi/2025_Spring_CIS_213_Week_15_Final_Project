import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

function Hero() {
    return (
        <section id="home" className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 className={styles.title}>Welcome to Pulse</h1>
                <p className={styles.subtitle}>
                    Empowering ideas. Connecting people. Shaping the future.
                </p>
                <Link to="/dashboard"  className={styles.cta}>Go to Dashboard</Link>
            </div>
        </section>
    );
}

export default Hero;
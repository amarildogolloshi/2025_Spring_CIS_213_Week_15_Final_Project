import styles from "./Hero.module.css";

function Hero() {
    return (
        <section id="home" className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 className={styles.title}>Welcome to Pulse</h1>
                <p className={styles.subtitle}>
                    Empowering ideas. Connecting people. Shaping the future.
                </p>
                <button className={styles.cta}>Go to Dashboard</button>
            </div>
        </section>
    );
}

export default Hero;
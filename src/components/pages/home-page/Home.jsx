import styles from "./Home.module.css";

function Home() {
    return (
        <>
            <section id="hero" className={styles.section}>
                <h1>Home</h1>
                <p>Home Section!</p>
            </section>
            <section id="about" className={styles.section}>
                <h2>About</h2>
                <p>About section</p>
            </section>
            <section id="contact" className={styles.section}>
                <h2>Contact</h2>
                <p>Contact section</p>
            </section>
        </>
    );
}

export default Home;
import styles from "./About.module.css";

function About() {
    return (
        <section id="about" className={styles.section}>
            <h1 className={styles.h1}>About</h1>
                        {/* Mission Statement */}
                        <div className={styles.mission}>
                <h2>Our Mission</h2>
                <p>
                    At Pulse, our goal is to empower individuals and businesses with innovative solutions.
                    We strive to create cutting-edge technology that enhances efficiency and connects people.
                </p>
            </div>

            {/* Our Team */}
            <div className={styles.team}>
                <h2>Meet the Team</h2>
                <div className={styles.teamMembers}>
                    <div className={styles.member}>
                        <img src="https://media.licdn.com/dms/image/v2/D4E03AQGmJZ2wXldAoA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1715367457097?e=1750291200&v=beta&t=EAsz1GhFOCV8wgVLGPbQ8MUA2irPDvyFpOdzAudBg70" alt="Team Member" />
                        <p><strong>Amarildo Golloshi</strong></p>
                    </div>
                    <div className={styles.member}>
                        <img src="https://media.licdn.com/dms/image/v2/C4E03AQFg4H-ixki-dQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1628602898925?e=1750291200&v=beta&t=iJ1Mkb565vysXxwR8-SHSbuArSgPwhwYqbrB1mF_T9k" alt="Team Member" />
                        <p><strong>Chris Lee</strong></p>
                    </div>
                </div>
            </div>

            {/* Our Values */}
            <div className={styles.values}>
                <h2>Our Values</h2>
                <ul>
                    <li>🚀 Innovation - We push the boundaries of creativity and technology.</li>
                    <li>🤝 Collaboration - Great ideas come from teamwork.</li>
                    <li>💡 Integrity - Transparency and honesty guide every decision we make.</li>
                    <li>🌍 Community - We believe in giving back and making a positive impact.</li>
                </ul>
            </div>
        </section>
    );
}

export default About;
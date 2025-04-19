import styles from "./AboutTeam.module.css";

function AboutTeam() {
    return (
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
    );
}

export default AboutTeam;
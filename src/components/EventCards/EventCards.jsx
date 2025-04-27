import { useContext } from "react";
import UserContext from "../../../store/UserContextProvider";
import MemberCard from "./MemberCard";
import styles from './EventCards.module.css';

function EventCards({ eventID, name, memberIDS }) {
    const {user} = useContext(UserContext);

    return (
        <section className={styles.section}>
            <h3>{name}</h3>
            <div className={styles.cardContainer}>
                {
                    memberIDS.map((id) => (
                        <MemberCard key={id} memberID={id} />
                    ))
                }
            </div>
        </section>
    );
}

export default EventCards;
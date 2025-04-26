import { useContext, useState } from "react";
import UserContext from "../../../store/UserContextProvider";
import styles from "./MemberCard.module.css";

function MemberCard({memberID}) {
    const {user} = useContext(UserContext);
    const memberInfo = user.members.filter((member) => member.id == memberID)[0];

    return (
        <p className={styles.p}>
            {memberInfo.firstName}
        </p>
    );
}

export default MemberCard;
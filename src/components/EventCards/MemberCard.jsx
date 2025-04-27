import { useContext } from "react";
import UserContext from "../../../store/UserContextProvider";
import styles from "./MemberCard.module.css";
import PlaceholderImg from '/images/frank-placeholder.jpg';

function MemberCard({memberID}) {
    const {user} = useContext(UserContext);
    const memberInfo = user.members.filter((member) => member.id == memberID)[0];
    let arrow;
    if (memberInfo.followerCurrent == memberInfo.followerInit) {
        arrow = '=';
    } else if (memberInfo.followerCurrent < memberInfo.followerInit) {
        arrow = "-";
    } else {
        arrow = "+";
    }

    return (
        <div className={styles.container}>
            <img src={PlaceholderImg} alt="Member picture" />
            <p className={styles.infoContainer}>
                <span>{memberInfo.firstName}&nbsp;</span>
                <span>{memberInfo.lastName}</span>
                <span className={styles.last}>{memberInfo.socialLink}</span>
            </p>
            <p className={styles.followerInfo}>
                <span>Followers: {memberInfo.followerCurrent}</span>
                <span>
                    &nbsp;{arrow}
                </span>
            </p>
        </div>
    );
}

export default MemberCard;
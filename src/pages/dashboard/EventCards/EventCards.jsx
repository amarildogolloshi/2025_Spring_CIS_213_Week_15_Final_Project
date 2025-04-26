import { useContext, useState } from "react";
import UserContext from "../../../store/UserContextProvider";
import MemberCard from "./MemberCard";

function EventCards({ eventID, memberIDS }) {
    const {user} = useContext(UserContext);

    return (
        <section>
            {
                memberIDS.map((id) => (
                    <MemberCard key={id} memberID={id} />
                ))
            }
        </section>
    );
}

export default EventCards;
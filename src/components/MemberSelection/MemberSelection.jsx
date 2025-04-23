import { useContext, useState } from "react";
import UserContext from "../../store/UserContextProvider";
import styles from "./MemberSelection.module.css";

const ERROR_STYLE = {"color": "var(--error-red)"};
const SUCCESS_STYLE = {"color": "var(--success-green)"};
const PERSIST_FEEDBACK = "Remember to save your changes!";

function MemberSelection() {
    const [selectedEvent, setSelectedEvent] = useState("");
    const [eventMembers, setEventMembers] = useState([]);
    const [operationFeedback, setOperationFeedback] = useState(PERSIST_FEEDBACK);
    const [operationStyle, setOperationStyle] = useState(true); // true means you added a member, false remove
    const {user, dispatch} = useContext(UserContext);

    /** Handles event selection for viewing members associated with an event.
    * @param {string} id - Expects an Event Id from the selection list.
    * 
    */
    function handleSelect(e) {
        const eventId = e.target.value;
        setSelectedEvent(eventId);

        console.log(user.events.filter((event) => event.id == eventId)[0].eventMembers);
        
        // Gather current member ids for the event
        setEventMembers(user.events.filter((event) => event.id == eventId)[0].eventMembers);
    }

    // Handles updating event members, based on the checkbox state
    function handleCheckboxChange(e) {
        // Store target values
        let [id, firstName, lastName] = (e.target.value.split(" "));
        let checked = e.target.checked;

        // Update current members based on checked
        setEventMembers(prevMembers => 
            checked ? [...prevMembers, id] : prevMembers.filter((memberId) => memberId != id)
        )

        // Provide feedback accordingly
        setOperationStyle(checked);
        setOperationFeedback( checked ? 
            `Member: ${firstName} ${lastName} added. ` + PERSIST_FEEDBACK
            : `Member: ${firstName} ${lastName} removed. ` + PERSIST_FEEDBACK
        );
    }

    // console.log(user.members);

    return (
        <section className={styles.section}>
            <span style={operationStyle ? SUCCESS_STYLE : ERROR_STYLE}>{operationFeedback}</span>
            <label>Select an Event</label>
            <select value={selectedEvent} onChange={handleSelect}>
                <option value="" disabled>Event</option>
                {user.events.map((event) => (
                    <option key={event.id} value={event.id}>
                        {event.name}
                    </option>
                ))}
            </select>
            <div>
                {selectedEvent && user.members.map((member) => (
                    <p key={member.id}>
                        <input
                            type="checkbox"
                            value={`${member.id} ${member.firstName} ${member.lastName}`}
                            checked={eventMembers.includes(member.id)}
                            onChange={handleCheckboxChange}
                        />
                        <label>{member.firstName}</label>
                    </p>

                    
                ))
                }
            </div>
        </section>
    );
}

export default MemberSelection;
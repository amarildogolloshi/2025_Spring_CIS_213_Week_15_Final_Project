import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/UserContextProvider";
import styles from "./MemberSelection.module.css";

const ERROR_STYLE = {"color": "var(--error-red)"};
const SUCCESS_STYLE = {"color": "var(--success-green)"};

function MemberSelection() {
    const {user, dispatch} = useContext(UserContext);
    const [selectedEvent, setSelectedEvent] = useState("");
    const [selectedSort, setSelectedSort] = useState("");
    const [visisbleMembers, setVisibleMembers] = useState(user.members);
    const [eventMembers, setEventMembers] = useState([]);
    const [search, setSearch] = useState("");
    const [operationFeedback, setOperationFeedback] = useState("");
    const [operationStyle, setOperationStyle] = useState(true); // true means you added a member, false remove

    /** Handles event selection for viewing members associated with an event.
    * @param {string} id - Expects an Event Id from the selection list.
    * 
    */
    function handleEventSelect(e) {
        const eventId = e.target.value;
        setSelectedEvent(eventId);
        
        // Gather current member ids for the event
        setEventMembers(user.events.filter((event) => event.id == eventId)[0].eventMembers);
    }


    function handleSortSelect(e) {
        setSelectedSort(e.target.value);
        const sortBy = e.target.value;

        switch (sortBy) {
            case "first":
                setVisibleMembers(prevMembers => prevMembers.toSorted((a, b) =>
                    a.firstName.localeCompare(b.firstName)
                ))
                break;
            case "last": 
                setVisibleMembers(prevMembers => prevMembers.toSorted((a, b) =>
                    a.lastName.localeCompare(b.lastName)
                ))
                break;

            case "follower":
                setVisibleMembers(prevMembers => prevMembers.toSorted((a, b) =>
                    b.followerCurrent - a.followerCurrent
                ))
                break;
            default:
                break;
        }
    }

    function handleSearch(e) {
        setSearch(e.target.value);
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

        //  Variable to deal with state not updating immediately
        const memberIds = checked ? [...eventMembers, id] : eventMembers.filter((memberId) => memberId != id)

        // Dispatch changes - update members for an event
        dispatch({
            type: "UPDATE_EVENT_MEMBERS",
            payload: {
                memberIds, 
                eventId: selectedEvent,
            }  
        })

        // Provide feedback accordingly
        setOperationStyle(checked);
        setOperationFeedback( checked ? 
            `Member: ${firstName} ${lastName} added. `
            : `Member: ${firstName} ${lastName} removed. `
        );
    }

    useEffect(() => {
        // Update visable members based on case-insensitive search.
        // Note: Spaces are removed from search; first and last name is joined
        setVisibleMembers(user.members.filter((member) => 
                `${member.firstName.toLowerCase()}${member.lastName.toLowerCase()}`
                .includes(search.toLowerCase().replaceAll(" ", ""))
        ))
    }, [search]);

    return (
        <section className={styles.section}>
            <span style={operationStyle ? SUCCESS_STYLE : ERROR_STYLE}>{operationFeedback}</span>
            <label>Select an Event</label>
            <select value={selectedEvent} onChange={handleEventSelect}>
                <option value="" disabled>Event</option>
                {user.events.map((event) => (
                    <option key={event.id} value={event.id}>
                        {event.name}
                    </option>
                ))}
            </select>
            <label>Sort By</label>
            <select value={selectedSort} onChange={handleSortSelect}>
                <option value="" disabled>Sort</option>
                <option value="first">First Name</option>
                <option value="last">Last Name</option>
                <option value="follower">Follower Count</option>
            </select>
            <input type="search" value={search} onChange={handleSearch} />
            <div>
                {selectedEvent && visisbleMembers.map((member) => (
                    <p key={member.id}>
                        <input
                            type="checkbox"
                            value={`${member.id} ${member.firstName} ${member.lastName}`}
                            checked={eventMembers.includes(member.id)}
                            onChange={handleCheckboxChange}
                        />
                        <label>{member.firstName}&nbsp;{member.lastName}</label>
                    </p>

                    
                ))
                }
            </div>
        </section>
    );
}

export default MemberSelection;
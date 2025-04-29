import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/UserContextProvider";
import styles from "./MemberSelection.module.css";
import useApi from "../../hooks/useAPI";

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

    console.log(user.events);
    console.log(user.events.filter((event) => event.id == selectedEvent)[0])
    const { data, loading, error, refetch } = useApi(`/api/events/${selectedEvent}/members`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            user.events.filter((event) => event.id == selectedEvent)[0]
        )
    });

    /** Handles event selection for viewing members associated with an event.
    * @param {string} id - Expects an Event Id from the selection list.
    * 
    */
    function handleEventSelect(e) {
        let eventId = e.target.value;
        eventId = parseInt(eventId);
        setSelectedEvent(eventId);

        // Gather current member ids for the event
        setEventMembers(user.events.filter((event) => event.id == eventId)[0].members.map((member) => member.id));
    }

    function handleSubmitBtn() {
        // Ensure event is selected and eventMembers is not empty
        console.log("Submitted");
        // if (selectedEvent != "" && eventMembers != []) {
        //     useApi(`/api/events/${selectedEvent}/members`, {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             event_id: selectedEvent,
        //             members: eventMembers,
        //         })
        //     }, false);
        // } else {
        //     console.log("Selected event is empty OR eventMembers is empty.");
        // }
        refetch(true);
    }

    function handleSortSelect(e) {
        setSelectedSort(e.target.value);
        const sortBy = e.target.value;

        switch (sortBy) {
            case "first":
                setVisibleMembers(prevMembers => prevMembers.toSorted((a, b) => {
                    return a.name.trim().localeCompare(b.name.trim());
                }
                ))
                break;
            case "last": 
                setVisibleMembers(prevMembers => prevMembers.toSorted((a, b) => {
                    return a.name.trim().split(" ").at(-1).localeCompare(b.name.trim().split(" ").at(-1))
                }
                ))
                break;

            case "follower":
                setVisibleMembers(prevMembers => prevMembers.toSorted((a, b) =>
                    b.followers_current - a.followers_current
                ))
                break;
            case "member":
                setVisibleMembers(prevMembers => prevMembers.toSorted((a, b) => {
                    if (eventMembers.includes(a.id) && !eventMembers.includes(b.id)) {
                        // If 'a' is member but 'b' is not, 'a' goes first
                        return -1;
                    } else if (!eventMembers.includes(a.id) && eventMembers.includes(b.id)) {
                        return 1;
                    } else {
                        return 0;
                    }
                }))

                break;
            case "nonmember":
                setVisibleMembers(prevMembers => prevMembers.toSorted((a, b) => {
                    if (eventMembers.includes(a.id) && !eventMembers.includes(b.id)) {
                        // If 'a' is member but 'b' is not, 'b' goes first
                        return 1;
                    } else if (!eventMembers.includes(a.id) && eventMembers.includes(b.id)) {
                        return -1;
                    } else {
                        return 0;
                    }
                }))

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
        let [id, name] = (e.target.value.split(" "));
        let checked = e.target.checked;

        // Parse ID as an int
        id = parseInt(id);

        // Update current members based on checked
        setEventMembers(prevMembers => 
            checked ? [...prevMembers, id] : prevMembers.filter((memberId) => memberId != id)
        )

        //  Variable to deal with state not updating immediately
        const memberIds = checked ? [...eventMembers, id] : eventMembers.filter((memberId) => memberId != id)

        // Dispatch changes - update members for an event TODO
        dispatch({
            type: "UPDATE_EVENT_MEMBERS",
            payload: {
                memberIds, 
                eventId: parseInt(selectedEvent),
            }  
        })

        // Provide feedback accordingly
        setOperationStyle(checked);
        setOperationFeedback( checked ? 
            `Member: ${name} added. `
            : `Member: ${name} removed. `
        );
    }

    useEffect(() => {
        // Update visable members based on case-insensitive search.
        // Note: Spaces are removed from search; first and last name is joined
        setVisibleMembers(user.members.filter((member) => 
                member.name.toLowerCase()
                .includes(search.toLowerCase().replaceAll(" ", ""))
        ))
    }, [search]);

    return (
        <section className={styles.section}>
            <span style={operationStyle ? SUCCESS_STYLE : ERROR_STYLE}>{operationFeedback}</span>
            <div className={styles.inputs}>
                <div className={styles.inputContainer}>
                    <label>Select an Event</label>
                    <select value={selectedEvent} onChange={handleEventSelect}>
                        <option value="" disabled>Event</option>
                        {user.events.map((event) => (
                            <option key={event.id} value={event.id}>
                                {event.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label>Sort By</label>
                    <select value={selectedSort} onChange={handleSortSelect}>
                        <option value="" disabled>Sort</option>
                        <option value="first">First Name</option>
                        <option value="last">Last Name</option>
                        <option value="follower">Follower Count</option>
                        <option value="member">Event Member</option>
                        <option value="nonmember">Non Event Member</option>
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label>Search: </label>
                    <input type="search" value={search} onChange={handleSearch} />
                </div>
                <button 
                    className={styles.submitBtn}
                    onClick={handleSubmitBtn}
                >
                    Submit Changes
                </button>
            </div>
            <div className={styles.memberDisplay}>
                    {selectedEvent && visisbleMembers.map((member) => (
                        <p key={member.id}>
                            <input
                                type="checkbox"
                                value={`${member.id} ${member.name}`}
                                checked={eventMembers.includes(member.id)}
                                onChange={handleCheckboxChange}
                            />
                            <label>
                                <span>{member.name}</span>
                                <span>{member.followers_current}</span>
                            </label>
                        </p>
                    ))
                    }
            </div>
        </section>
    );
}

export default MemberSelection;
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";
import useInput from "../../../hooks/useInput";
import styles from '../../members/Members.module.css';
import { faL, faSearch } from "@fortawesome/free-solid-svg-icons";

const ERROR_STYLE = {"color": "var(--error-red)"};
const SUCCESS_STYLE = {"color": "var(--success-green)"};
const P_STYLE = {"fontStyle": "italic"};
const INLINK_STYLE = {"color": "var(--pulse-blue)"};

function EventCreate() {
    const {user, dispatch} = useContext(UserContext);
    const [operationFeedback, setOperationFeedback] = useState("");
    const [nameController, nameErrorController] = useInput("");
    const [startController, startErrorController] = useInput("");
    const [endController, endErrorController] = useInput("");

    // Start time, end time, members

    function handleSubmit(e) {
        e.preventDefault();

        let rCode = true;   // Assume valid form
        
        // Check for initial errors
        // Check event name
        if (nameController.value == "") {
            // Ensure errorController's error state is true
            if (!nameErrorController.error) {
                nameErrorController.handleUpdateError("Event name cannot be empty.");
            }
            rCode = false;
        } else {
            // If event name contains no errors, ensure error state is false
            if (nameErrorController.error) {
                nameErrorController.handleUpdateError();
            }
        }

        // Check event start time
        if (startController.value == "") {
            // Ensure errorController's error state is true
            if (!startErrorController.error) {
                startErrorController.handleUpdateError("Start time must be selected.");
            }
            rCode = false;
        } else {
            // If start time contains no errors, ensure error state is false
            if (startErrorController.error) {
                startErrorController.handleUpdateError();
            }
        }

        // Check event end time
        if (endController.value == "") {    // Empty check
            // Ensure errorController's error state is true
            if (!endErrorController.error) {
                endErrorController.handleUpdateError("End time must be selected.");
            }
            rCode = false;
        } else if (startController.value >= endController.value) {   // End time must be after start time
            // Ensure correct errorController error message
            console.log("hits");
            let errMsg = "Event End Time must be after Event Start Time.";
            if (!endErrorController.error || endErrorController.errorMessage != errMsg) {
                endErrorController.handleUpdateError(errMsg, true);
            }
            rCode = false;
        } else {
            // If end time contains no errors, ensure error state is false
            if (endErrorController.error) {
                endErrorController.handleUpdateError();
            }
        }

        // If no errors were found, process form
        if (rCode) {
            // Dispatch ADD_EVENT
            dispatch({
                type: "ADD_EVENT",
                payload: {
                    name: nameController.value,
                    eventMembers: [12345, 12346],
                    startTime: startController.value,
                    endTime: endController.value,
                }
            });

            // Provide success feedback & reset input values
            setOperationFeedback(`${nameController.value} successfully created.`)
            nameController.handleUpdateValue("");
            startController.handleUpdateValue("");
            endController.handleUpdateValue("");
        }

    }

    return (
        <PrivateLayout>
            <h3>Create a new Event</h3>
            <p style={P_STYLE}>Add Members to Events in <Link style={INLINK_STYLE} to="/pulse/events">Events &gt; Show All</Link></p>
            <span style={SUCCESS_STYLE}>{operationFeedback}</span>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label>Event Name: </label>
                    <span style={ERROR_STYLE}>
                        {nameErrorController.error && nameErrorController.errorMessage}
                    </span>
                    <input type="text" value={nameController.value} 
                        onChange={(e) => nameController.handleUpdateValue(e.target.value)}
                    />
                </div>
                <div>
                    <label>Event Start Time: </label>
                    <span style={ERROR_STYLE}>
                        {startErrorController.error && startErrorController.errorMessage}
                    </span>
                    <input type="datetime-local" value={startController.value} className={styles.inputTime}
                        onChange={(e) => startController.handleUpdateValue(e.target.value)}
                    />
                </div>
                <div>
                    <label>Event End Time: </label>
                    <span style={ERROR_STYLE}>
                        {endErrorController.error && endErrorController.errorMessage}
                    </span>
                    <input type="datetime-local" value={endController.value} className={styles.inputTime}
                        onChange={(e) => endController.handleUpdateValue(e.target.value)}
                    />
                </div>


                <button type="submit">Create Event</button>
            </form>
        </PrivateLayout>
    ) 
}

export default EventCreate;
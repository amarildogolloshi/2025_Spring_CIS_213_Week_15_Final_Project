import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";
import useInput from "../../../hooks/useInput";
import styles from '../Members.module.css';

const ERROR_STYLE = {"color": "var(--error-red)"};
const SUCCESS_STYLE = {"color": "var(--success-green)"};

function MemberCreate() {
    const {user, dispatch} = useContext(UserContext);
    const [operationFeedback, setOperationFeedback] = useState("");
    const [fNameController, fNameErrorController] = useInput("");
    const [lNameController, lNameErrorController] = useInput("");
    const [mediaController, mediaErrorController] = useInput("");

    // const userData = JSON.parse(localStorage.getItem("user"));    
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        let rCode = true;   // Assume valid form

        // Check for initial errors
        // Check first name
        if (fNameController.value == "") {
            // Ensure errorController's error state is true
            if (!fNameErrorController.error) {
                fNameErrorController.handleUpdateError("First name cannot be empty.");
            }
            rCode = false;
        } else {
            // If first name contains no errors, ensure error state is false
            if (fNameErrorController.error) {
                fNameErrorController.handleUpdateError();
            }
        }

        // Check last name
        if (lNameController.value == "") {
            // Ensure errorController's error state is true
            if (!lNameErrorController.error) {
                lNameErrorController.handleUpdateError("Last name cannot be empty.");
            }
            rCode = false;
        } else {
            // If last name contains no errors, ensure error state is false
            if (lNameErrorController.error) {
                lNameErrorController.handleUpdateError();
            }
        }

        // Check media link
        if (!mediaController.value.includes('@')) {
            // Ensure errorController's error state is true
            if (!mediaErrorController.error) {
                mediaErrorController.handleUpdateError("Must be a valid social media link.");
            }
            rCode = false;
        } else {
            // If media contains no errors, ensure error state is false
            if (mediaErrorController.error) {
                mediaErrorController.handleUpdateError();
            }
        }

        // If no errors were found, process form
        if (rCode) {
            // Dispatch ADD_MEMBER
            dispatch({
                type: "ADD_MEMBER",
                payload: {
                    firstName: fNameController.value,
                    lastName: lNameController.value,
                    socialLink: mediaController.value,
                }
            });

            // Provide success feedback & reset input values
            setOperationFeedback(`${fNameController.value} successfully created.`);
            fNameController.handleUpdateValue("");
            lNameController.handleUpdateValue("");
            mediaController.handleUpdateValue("");
        }
    }

    return (
        <PrivateLayout>
            <h3>Create a new Member</h3>
            <span style={SUCCESS_STYLE}>{operationFeedback}</span>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label>Member First Name: </label>
                    <span style={ERROR_STYLE}>
                        {fNameErrorController.error && fNameErrorController.errorMessage}
                    </span>
                    <input type="text" value={fNameController.value} 
                        onChange={(e) => fNameController.handleUpdateValue(e.target.value)}
                    />
                </div>
                <div>
                    <label>Member Last Name: </label>
                    <span style={ERROR_STYLE}>
                        {lNameErrorController.error && lNameErrorController.errorMessage}
                    </span>
                    <input type="text" value={lNameController.value}
                        onChange={(e) => lNameController.handleUpdateValue(e.target.value)}
                    />
                </div>
                <div>
                    <label>Member Social Media Link: </label>
                    <span style={ERROR_STYLE}>
                        {mediaErrorController.error && mediaErrorController.errorMessage}
                    </span>
                    <input type="text" value={mediaController.value}
                        onChange={(e) => mediaController.handleUpdateValue(e.target.value)}
                    />
                </div>

                <button type="submit">Create Member</button>
            </form>
        </PrivateLayout>
        
    ) 
}

export default MemberCreate;
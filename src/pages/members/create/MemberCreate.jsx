import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";
import useInput from "../../../hooks/useInput";
import styles from '../Members.module.css';
import useApi from "../../../hooks/useAPI";
import DynamicMessage from "../../../components/DynamicMessage/DynamicMessage";

const ERROR_STYLE = {"color": "var(--error-red)"};
const SUCCESS_STYLE = {"color": "var(--success-green)"};

function MemberCreate() {
    const {user, dispatch} = useContext(UserContext);
    const [operationFeedback, setOperationFeedback] = useState("");
    const [fullNameController, fullNameErrorController] = useInput("Test");
    const [userNameController, userNameErrorController] = useInput("test");
    const [initialFollowersController, initialFollowersErrorController] = useInput("57");
    const [dateOfEnterController, dateOfEnterErrorController] = useInput("2025-04-27");
    
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("success");

    // const userData = JSON.parse(localStorage.getItem("user"));    
    const navigate = useNavigate();

    // Hook for the API call (Initialize with no payload)
    const { data:memberDataCreate, loading:memberLoadingCreate, error:memberErrorCreate, refetch:memberRefetchCreate } = useApi("/api/members/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: fullNameController.value,
            username: userNameController.value,
            followers_init: initialFollowersController.value,
            followers_current: initialFollowersController.value,
            date_enter: dateOfEnterController.value,
            created_by: user.user.id,
        }),
    }, false);

    function handleSubmit(e) {
        e.preventDefault();
        let rCode = true;   // Assume valid form

        // Check for initial errors
        // Check name
        if (fullNameController.value == "") {
            // Ensure errorController's error state is true
            if (!fullNameErrorController.error) {
                fullNameErrorController.handleUpdateError("First name cannot be empty.");
            }
            rCode = false;
        } else {
            // If first name contains no errors, ensure error state is false
            if (fullNameErrorController.error) {
                fullNameErrorController.handleUpdateError();
            }
        }

        // Check username for Instagram
        if (userNameController.value == "") {
            // Ensure errorController's error state is true
            if (!userNameErrorController.error) {
                userNameErrorController.handleUpdateError("Last name cannot be empty.");
            }
            rCode = false;
        } else {
            // If last name contains no errors, ensure error state is false
            if (userNameErrorController.error) {
                userNameErrorController.handleUpdateError();
            }
        }

        // Check initial followers
        if (initialFollowersController.value == "") {
            // Ensure errorController's error state is true
            if (!initialFollowersErrorController.error) {
                initialFollowersErrorController.handleUpdateError("The initial follower can not be empty");
            }
            rCode = false;
        } else {
            // If media contains no errors, ensure error state is false
            if (initialFollowersErrorController.error) {
                initialFollowersErrorController.handleUpdateError();
            }
        }

         // Check date of enter
         if (dateOfEnterController.value == "") {
            // Ensure errorController's error state is true
            if (!dateOfEnterErrorController.error) {
                dateOfEnterErrorController.handleUpdateError("Must be a valid social media link.");
            }
            rCode = false;
        } else {
            // If media contains no errors, ensure error state is false
            if (dateOfEnterErrorController.error) {
                dateOfEnterErrorController.handleUpdateError();
            }
        }

        // If no errors were found, process form
        if (rCode) {

            // Send PUT request to backend
            memberRefetchCreate(true);
        }
    }

    useEffect(() => {
        console.log("Member Create:useEffect")  
            if (memberErrorCreate) {
                console.log("Error:", memberErrorCreate)
                setMessage("Error fetching data: " + memberErrorCreate);
                setMessageType("error");
            }
    
            if (memberDataCreate && !memberErrorCreate) {
                // console.log("Login user:", user)
                console.log("Login data:", memberDataCreate)
                console.log("Login data:", memberDataCreate.member)
                // console.log("Login data:", data.user)
                // login(user, data.access_token );
                console.log(!memberDataCreate.success)
                if (!memberDataCreate.success) {
                    setMessage( memberDataCreate?.message);
                    setMessageType("error");
                    return;
                }
                //Dispatch ADD_MEMBER
                dispatch({
                    type: "ADD_MEMBER",
                    payload: memberDataCreate.member
                });

                // Provide success feedback & reset input values
                setOperationFeedback(`${fullNameController.value} successfully created.`);
                fullNameController.handleUpdateValue("");
                userNameController.handleUpdateValue("");
                initialFollowersController.handleUpdateValue("");
                dateOfEnterController.handleUpdateValue("");

            }
 
        }, [memberDataCreate, memberErrorCreate]);

    return (
        <PrivateLayout>
            {message && <DynamicMessage type={messageType} message={message} />}

            <h2>Create a new Member</h2>
            <span style={SUCCESS_STYLE}>{operationFeedback}</span>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label>Name: </label>
                    <span style={ERROR_STYLE}>
                        {fullNameErrorController.error && fullNameErrorController.errorMessage}
                    </span>
                    <input type="text" value={fullNameController.value} 
                        onChange={(e) => fullNameController.handleUpdateValue(e.target.value)}
                    />
                </div>
                <div>
                    <label>Username: </label>
                    <span style={ERROR_STYLE}>
                        {userNameErrorController.error && userNameErrorController.errorMessage}
                    </span>
                    <input type="text" value={userNameController.value}
                        onChange={(e) => userNameController.handleUpdateValue(e.target.value)}
                    />
                </div>
                <div>
                    <label>Initial Followers: </label>
                    <span style={ERROR_STYLE}>
                        {initialFollowersErrorController.error && initialFollowersErrorController.errorMessage}
                    </span>
                    <input type="number" value={initialFollowersController.value}
                        onChange={(e) => initialFollowersController.handleUpdateValue(e.target.value)}
                    />
                </div>

                <div>
                    <label>Date of enter: </label>
                    <span style={ERROR_STYLE}>
                        {dateOfEnterErrorController.error && dateOfEnterErrorController.errorMessage}
                    </span>
                    <input type="date" value={dateOfEnterController.value}
                        onChange={(e) => dateOfEnterController.handleUpdateValue(e.target.value)}
                    />
                </div>

                <button type="submit">Create Member</button>
            </form>
        </PrivateLayout>
        
    ) 
}

export default MemberCreate;
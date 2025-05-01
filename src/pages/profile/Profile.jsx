import { useContext, useEffect, useState } from "react";
import PrivateLayout from "../../components/private/PrivateLayout";
import UserContext from "../../store/UserContextProvider";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router";

import styles from './Profile.module.css';
import useApi from "../../hooks/useAPI";
import DynamicMessage from "../../components/DynamicMessage/DynamicMessage";

const ERROR_STYLE = {"color": "var(--error-red)"};
const SUCCESS_STYLE = {"color": "var(--success-green)"};

function Profile() {
    const {user, dispatch} = useContext(UserContext);
    const [operationFeedback, setOperationFeedback] = useState("");
    const [fullNameController, fullNameErrorController] = useInput(user.user.name);
    const [emailController, emailErrorController] = useInput(user.user.username);
    const [companyController, companyErrorController] = useInput(user.user.company || "");
    const [currentPasswordController, currentPasswordErrorController] = useInput("");
    const [newPasswordController, newPasswordErrorController] = useInput("");
    const [reenterNewPasswordController, reenterNewPasswordErrorController] = useInput("");

    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("success");

    const navigate = useNavigate();

     // Hook for the API call (Initialize with no payload)
     const { data:saveProfileData, loading:saveProfileLoading, error:saveProfileError, refetch:saveProfileRefetch } = useApi("/api/users/" + user.user.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: fullNameController.value,
            username: emailController.value,
            company: companyController.value,
        }),
    }, false);

    const { data:changePasswordData, loading:changePasswordLoading, error:changePasswordError, refetch:changePasswordRefetch } = useApi("/api/users/" + user.user.id + "/change-password", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            old_password: currentPasswordController.value,
            new_password: newPasswordController.value,
        }),
    }, false);

    function handleSaveProfileSubmit(e) {
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

         // Check email for errors
         if (emailController.value == "") {
            // If email contains an error
            if (!emailErrorController.error) {   // Ensure errorController's error state is true
                emailErrorController.handleUpdateError("Email cannot be empty.");
            }
            rCode = false;
        } else {
            // If email contains no errors
            if (emailErrorController.error) {   // Ensure errorController's error state is false
                emailErrorController.handleUpdateError();
            }
        }

        // If no errors were found, process form
        if (rCode) {
            saveProfileRefetch()
        }
    }

    function handleChangePasswordSubmit(e) {
        e.preventDefault();
        let rCode = true;   // Assume valid form

        // Check old password for errors
        if (currentPasswordController.value == "") {
            // If email contains an error
            if (!currentPasswordErrorController.error) {   // Ensure errorController's error state is true
                currentPasswordErrorController.handleUpdateError("Current Password can not be empty.");
            }
            rCode = false;
        } else {
            // If email contains no errors
            if (currentPasswordErrorController.error) {   // Ensure errorController's error state is false
                currentPasswordErrorController.handleUpdateError();
            }
        }

        // Check new password for errors
        if (newPasswordController.value == "") {
            // If email contains an error
            if (!newPasswordErrorController.error) {   // Ensure errorController's error state is true
                newPasswordErrorController.handleUpdateError("New Password can not be empty.");
            }
            rCode = false;
        } else {
            // If email contains no errors
            if (newPasswordErrorController.error) {   // Ensure errorController's error state is false
                newPasswordErrorController.handleUpdateError();
            }
        }

        // Check old password for errors
        if (reenterNewPasswordController.value == "") {
            // If email contains an error
            if (!reenterNewPasswordErrorController.error) {   // Ensure errorController's error state is true
                reenterNewPasswordErrorController.handleUpdateError("Reenter Password can not be empty.");
            }
            rCode = false;
        } else {
            // If email contains no errors
            if (reenterNewPasswordErrorController.error) {   // Ensure errorController's error state is false
                reenterNewPasswordErrorController.handleUpdateError();
            }
        }

        // Validate new password for errors
        if (reenterNewPasswordController.value !== newPasswordController.value) {
            // If email contains an error
            if (!reenterNewPasswordErrorController.error) {   // Ensure errorController's error state is true
                reenterNewPasswordErrorController.handleUpdateError("The new password does not match!");
            }
            rCode = false;
        } else {
            // If email contains no errors
            if (reenterNewPasswordErrorController.error) {   // Ensure errorController's error state is false
                reenterNewPasswordErrorController.handleUpdateError();
            }
        }


        // If no errors were found, process form
        if (rCode) {
            changePasswordRefetch()
        }
    }

    useEffect(() => {
        if (saveProfileError) {
            // console.log("Error:", saveProfileError)
            setMessage("Error fetching data: " + saveProfileError);
            setMessageType("error");
        }

        if (saveProfileData && !saveProfileError) {
            // console.log("Login data:", saveProfileData)
            
            setMessage(saveProfileData.message);
            setMessageType("success");

            //Dispatch UPDATE_USER
            dispatch({
                type: "UPDATE_USER",
                payload: saveProfileData.data
            });

            // Provide success feedback & reset input values
            setOperationFeedback(`${fullNameController.value} successfully updated.`);

        }
    
    }, [saveProfileData, saveProfileError]);


    useEffect(() => {
        if (changePasswordError) {
            // console.log("Error:", saveProfileError)
            setMessage("Error fetching data: " + changePasswordError);
            setMessageType("error");
        }

        if (changePasswordData && !changePasswordError) {
            // console.log("Login data:", saveProfileData)
            
            setMessage(changePasswordData.message);
            setMessageType("success");

            // Provide success feedback & reset input values
            setOperationFeedback(`${fullNameController.value} successfully updated.`);

        }
    
    }, [changePasswordData, changePasswordError]);

    return (
        <PrivateLayout>
            {message && <DynamicMessage type={messageType} message={message} />}
            <div className={styles["profile-general"]}>
            <h2>Profile</h2>
                <form onSubmit={handleSaveProfileSubmit} className={styles.form}>
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
                    <label>Username / Email: </label>
                    <span style={ERROR_STYLE}>
                        {emailErrorController.error && emailErrorController.errorMessage}
                    </span>
                    <input type="text" value={emailController.value} 
                        onChange={(e) => emailController.handleUpdateValue(e.target.value)}
                    />
                </div>

                <div>
                    <label>Company: </label>
                    <span style={ERROR_STYLE}>
                        {companyErrorController.error && companyErrorController.errorMessage}
                    </span>
                    <input type="text" value={companyController.value} 
                        onChange={(e) => companyController.handleUpdateValue(e.target.value)}
                    />
                </div>
                <button type="submit">Save Profile</button>
               </form>
            </div>
                
            <div className={styles["profile-change-password"]}></div>
                <h2>Change Password</h2>
                <form onSubmit={handleChangePasswordSubmit} className={styles.form}>
                    <div>
                        <label>Current Password: </label>
                        <span style={ERROR_STYLE}>
                            {currentPasswordErrorController.error && currentPasswordErrorController.errorMessage}
                        </span>
                        <input type="password" value={currentPasswordController.value} 
                            onChange={(e) => currentPasswordController.handleUpdateValue(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>New Password: </label>
                        <span style={ERROR_STYLE}>
                            {newPasswordErrorController.error && newPasswordErrorController.errorMessage}
                        </span>
                        <input type="password" value={newPasswordController.value} 
                            onChange={(e) => newPasswordController.handleUpdateValue(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Re-enter New Password: </label>
                        <span style={ERROR_STYLE}>
                            {reenterNewPasswordErrorController.error && reenterNewPasswordErrorController.errorMessage}
                        </span>
                        <input type="text" value={reenterNewPasswordController.value} 
                            onChange={(e) => reenterNewPasswordController.handleUpdateValue(e.target.value)}
                        />
                    </div>
                    <button type="submit">Change Password</button>
            </form>
            
        </PrivateLayout>
        
    );     
}

export default Profile;
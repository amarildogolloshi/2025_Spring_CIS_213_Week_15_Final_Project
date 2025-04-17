import { use, useEffect } from "react";
import UserContext from "../../store/UserContextProvider";
import { useNavigate } from "react-router";
import styles from "../UserLoginControl.module.css";
import { NavLink } from "react-router-dom";
import useInput from "../../hooks/useInput";

const ERROR_STYLE = {"color": "var(--error-red)"};

function SignUp() {
    const {user, dispatch} = use(UserContext);
    const navigate = useNavigate();     // For redirecting to Dashboard upon successful login
    const [userController, userErrorController] = useInput("");
    const [emailController, emailErrorController] = useInput("");
    const [companyController, companyErrorController] = useInput("");
    const [passController, passErrorController] = useInput("");
    const [rePassController, rePassErrorController] = useInput("");

    // Handle submit: Updates 'user' (ON THE NEXT RENDER) upon successful login
    function handleSubmit(e) {
        e.preventDefault();
        let rCode = true;   // Assume valid form

        // Check username for errors
        if (userController.value.length < 9) {
            // If username contains an error
            if (!userErrorController.error) {   // Ensure errorController's error state is true
                userErrorController.handleUpdateError("Length must be greater than 8.");
            }
            rCode = false;
        } else {
            // If username contains no errors
            if (userErrorController.error) {   // Ensure errorController's error state is false
                userErrorController.handleUpdateError();
            }
        }

        // Check email for errors
        if (!emailController.value.includes('@')) {
            // If email contains an error
            if (!emailErrorController.error) {   // Ensure errorController's error state is true
                emailErrorController.handleUpdateError("Must be a valid email.");
            }
            rCode = false;
        } else {
            // If email contains no errors
            if (emailErrorController.error) {   // Ensure errorController's error state is false
                emailErrorController.handleUpdateError();
            }
        }

        // Check company for errors
        if (companyController.value.length < 3) {
            // If email contains an error
            if (!companyErrorController.error) {   // Ensure errorController's error state is true
                companyErrorController.handleUpdateError("Length must be greater than 2.");
            }
            rCode = false;
        } else {
            // If email contains no errors
            if (companyErrorController.error) {   // Ensure errorController's error state is false
                companyErrorController.handleUpdateError();
            }
        }

        // Check password for errors
        if (passController.value.length < 8) {
            // If email contains an error
            if (!passErrorController.error) {   // Ensure errorController's error state is true
                passErrorController.handleUpdateError("Length must be at least 8.");
            }
            rCode = false;
        } else {
            // If pass contains no errors
            if (passErrorController.error) {   // Ensure errorController's error state is false
                passErrorController.handleUpdateError();
            }
        }

        // Check retyped password for errors
        if (passController.value != rePassController.value) {
            // If passwords are not equal
            if (!rePassErrorController.error) {  // Ensure errorController's error state is false
                rePassErrorController.handleUpdateError("Passwords must match.");
            }
            rCode = false;
        } else {
            // If passwords match
            if (rePassErrorController.error) {  // Ensure errorController's state is false
                rePassErrorController.handleUpdateError();
            }
        }

        // If not errors were found, process form
        if (rCode) {
            dispatch({
                type: "SIGN_UP",
                payload: {
                    "username": userController.value,
                    "email": emailController.value,
                    "company": companyController.value,
                    "password": passController.value,
                }
            });
        }
    }

    // Only redirect when "user" changes
    useEffect(() => {
        if (user.isLoggedIn) {
            navigate("/dashboard");
        }
    }, [user]);

    return (
        <section className={styles.section}>
            <form onSubmit={handleSubmit}>
                <h2>Sing Up</h2>
                <div className={styles["form-body"]}>
                    <div className={styles["form-group"]}>
                        <label style={userErrorController.error ? ERROR_STYLE : {}}>Username: </label>
                        <span style={ERROR_STYLE}>{userErrorController.error && userErrorController.errorMessage}</span>
                        <input type="text" value={userController.value} onChange={(e) => userController.handleUpdateValue(e.target.value)}/>
                    </div>

                    <div className={styles["form-group"]}>
                        <label style={emailErrorController.error ? ERROR_STYLE : {}}>Email: </label>
                        <span style={ERROR_STYLE}>{emailErrorController.error && emailErrorController.errorMessage}</span>
                        <input type="text" value={emailController.value} onChange={(e) => emailController.handleUpdateValue(e.target.value)}/>
                    </div>
                    <div className={styles["form-group"]}>
                        <label style={companyErrorController.error ? ERROR_STYLE : {}}>Company: </label>
                        <span style={ERROR_STYLE}>{companyErrorController.error && companyErrorController.errorMessage}</span>
                        <input type="text" value={companyController.value} onChange={(e) => companyController.handleUpdateValue(e.target.value)}/>
                    </div>
                    
                    <div className={styles["form-group"]}>
                        <label style={passErrorController.error ? ERROR_STYLE : {}}>Password: </label> 
                        <span style={ERROR_STYLE}>{passErrorController.error && passErrorController.errorMessage}</span>
                        <input type="password" value={passController.value} onChange={(e) => passController.handleUpdateValue(e.target.value)}/>
                    </div>

                    <div className={styles["form-group"]}>
                        <label style={rePassErrorController.error ? ERROR_STYLE : {}}>Re-enter Password: </label> 
                        <span style={ERROR_STYLE}>{rePassErrorController.error && rePassErrorController.errorMessage}</span>
                        <input type="password" value={rePassController.value} onChange={(e) => rePassController.handleUpdateValue(e.target.value)}/>
                    </div>
                                        
                    <button type="submit">Sign Up</button>
                </div>
                
                <div className={styles["form-footer"]}>
                    <NavLink to={"/forgotpassword"}>Forgot Password?</NavLink>
                    <NavLink to={"/signin"}>Sign In!</NavLink>
                </div>
            </form>
        </section>
    );
}

export default SignUp;
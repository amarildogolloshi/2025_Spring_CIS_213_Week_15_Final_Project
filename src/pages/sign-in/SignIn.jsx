import { use, useEffect } from "react";
import { useState } from "react";
import UserContext from "../../store/UserContextProvider";
import { useNavigate } from "react-router";
import styles from "../UserLoginControl.module.css";
import { NavLink } from "react-router-dom";

function SignIn() {
    const {user, dispatch} = use(UserContext);
    const navigate = useNavigate();     // For redirecting to Dashboard upon successful login
    const [userInput, setUserInput] = useState("");
    const [passInput, setPassInput] = useState("");

    // Handle input
    const handleUserInput = (e) => setUserInput(e.target.value);
    const handlePassInput = (e) => setPassInput(e.target.value);

    // Handle submit: Updates 'user' (ON THE NEXT RENDER) upon successful login
    function handleSubmit(e) {
        e.preventDefault();
        dispatch({
            type: "SIGN_IN",
            payload: {
                "username": userInput,
                "password": passInput,
            }
        });
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
            <h2>Welcome to <span>Pulse</span></h2>
                <div className={styles["form-body"]}>
                     <div className={styles["form-group"]}>
                     <label>Username: </label>
                     <input type="text" value={userInput} onChange={handleUserInput}/>
                     </div>
                        

                    <div className={styles["form-group"]}>
                        <label>Password: </label>
                        <input type="password" value={passInput} onChange={handlePassInput}/>
                    </div>
                    
                    <button type="submit">Sign In</button>
                </div>
                
                <div className={styles["form-footer"]}>
                    <NavLink to={"/forgotpassword"}>Forgot Password?</NavLink>
                    <NavLink to={"/signup"}>Sign Up!</NavLink>
                </div>
            </form>
        </section>
    );
}

export default SignIn;
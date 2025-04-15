import { use, useEffect } from "react";
import { useState } from "react";
import UserContext from "../../store/UserContextProvider";
import { useNavigate } from "react-router";
import styles from "../UserLoginControl.module.css";
import { NavLink } from "react-router-dom";

function ForgotPassword() {
    const {user, dispatch} = use(UserContext);
        const navigate = useNavigate();     // For redirecting to Dashboard upon successful login
        const [emailInput, setEmailInput] = useState("");
        
        // Handle input
        const handleEmailInput = (e) => setEmailInput(e.target.value);
    
        // Handle submit: Updates 'user' (ON THE NEXT RENDER) upon successful login
        function handleSubmit(e) {
            e.preventDefault();
            dispatch({
                type: "FORGOT_PASSWORD",
                payload: {
                    "email": emailInput,
                }
            });
        }
    return (
        <section className={styles.section}>
            <form onSubmit={handleSubmit}>
            <h2> Forgot Password</h2>
                <div className={styles["form-body"]}>
                    
                    <div className={styles["form-group"]}>
                        <label>Email: </label>
                        <input type="text" value={emailInput} onChange={handleEmailInput}/>
                    </div>
                    
                    <button type="submit">Send Email</button>
                </div>
                
                <div className={styles["form-footer"]}>
                    <NavLink to={"/signin"}>Sign In!</NavLink>
                    <NavLink to={"/signup"}>Sign Up!</NavLink>
                </div> 
                
            </form>
            
        </section>
    );
}

export default ForgotPassword;
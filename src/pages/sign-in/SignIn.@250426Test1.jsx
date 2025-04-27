import { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import UserContext from "../../store/UserContextProvider";
import { useNavigate } from "react-router-dom";
import styles from "../UserLoginControl.module.css";
import { NavLink } from "react-router-dom";
import PublicLayout from "../../components/public/PublicLayout";
import useApi from "../../hooks/useAPI";

function SignIn() {
    const {user, dispatch, login} = useContext(UserContext);
    const navigate = useNavigate();     // For redirecting to Dashboard upon successful login

    const [userInput, setUserInput] = useState("user");
    const [passInput, setPassInput] = useState("pass1234");

    // Handle input
    const handleUserInput = (e) => setUserInput(e.target.value);
    const handlePassInput = (e) => setPassInput(e.target.value);

    // Hook for the API call (Initialize with no payload)
    const { data, loading, error, refetch } = useApi("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: userInput,
            password: passInput,
        }),
    });

    // Handle submit: Updates 'user' (ON THE NEXT RENDER) upon successful login
    function handleSubmit(e) {
        e.preventDefault();

        try{
            refetch();
        } catch(error) {
            console.error("Login failed:", error);
        }
        
    }

   
    // Only redirect when "user" changes
    useEffect(() => {
        console.log("Login user:", user)
        console.log("data:", data)
        if (data && !error && data.token) {
            login(user, data.token );
        }
        if (user?.isLoggedIn) {
            navigate("/pulse/dashboard");
        } 
    }, [user?.isLoggedIn]);

    return (
        <PublicLayout>
            <section className={styles.section}>
                <form onSubmit={handleSubmit}>
                    <h2>Welcome to <span>Pulse</span></h2>
                    <div className={styles["form-body"]}>
                        <div className={styles["form-group"]}>
                            <label htmlFor="username" >Username: </label>
                            <input type="text" id="username" name="username" value={userInput} onChange={handleUserInput} autoComplete="username" placeholder="Username"  />
                        </div>
                            
                        <div className={styles["form-group"]}>
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" name="password" value={passInput} onChange={handlePassInput}/>
                        </div>
                        
                        <button type="submit">Sign In</button>
                    </div>
                    
                    <div className={styles["form-footer"]}>
                        <NavLink to={"/forgotpassword"}>Forgot Password?</NavLink>
                        <NavLink to={"/signup"}>Sign Up!</NavLink>
                    </div>
                </form>
            </section>
        </PublicLayout>
        
    );
}

export default SignIn;
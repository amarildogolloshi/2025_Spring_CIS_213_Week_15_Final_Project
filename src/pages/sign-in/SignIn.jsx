import { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import UserContext from "../../store/UserContextProvider";
import { useNavigate } from "react-router-dom";
import styles from "../UserLoginControl.module.css";
import { NavLink } from "react-router-dom";
import PublicLayout from "../../components/public/PublicLayout";
import useApi from "../../hooks/useAPI";
import DynamicMessage from "../../components/DynamicMessage/DynamicMessage";

function SignIn() {
    const {user, dispatch, login} = useContext(UserContext);
    const navigate = useNavigate();     // For redirecting to Dashboard upon successful login
    
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("success");

        const [userInput, setUserInput] = useState("instaadmin");
        const [passInput, setPassInput] = useState("instaadmin");
        // const [userInput, setUserInput] = useState("RegisterTest@pulse.com");
        // const [passInput, setPassInput] = useState("RegisterTest");

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
        if (error) {
            console.log("Error:", error)
            setMessage("Error fetching data: " + error);
            setMessageType("error");
        }

        if (data && !error && data.access_token) {
            console.log("Login user:", user)
            console.log("Login data:", data)
            console.log("Login data:", data.user)
            login(user, data.access_token );
            // dispatch({
            //     type: "SET_SIGN_IN",
            //     payload: {
            //         "username": userInput,
            //         "token": data.access_token,
            //         "user": data,
            //         isLoggedIn: true,
            //     }
            // });

            dispatch({
                type: "SET_SIGN_IN",
                payload: data,
            });

        }
        if (user?.isLoggedIn) {
            navigate("/pulse/dashboard");
        } 
    }, [data, error, user?.isLoggedIn]);

    return (
        <PublicLayout>
             {message && <DynamicMessage type={messageType} message={message} />}
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
import { use, useEffect } from "react";
import { useState } from "react";
import UserContext from "../../../store/UserContextProvider";
import { useNavigate } from "react-router";

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
        <form onSubmit={handleSubmit}>
            <label>Username: </label>
            <input type="text" value={userInput} onChange={handleUserInput}/>
            <label>Password: </label>
            <input type="text" value={passInput} onChange={handlePassInput}/>
            <button type="submit">Sign In</button>
        </form>
    );
}

export default SignIn;
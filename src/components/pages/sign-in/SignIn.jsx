import { use } from "react";
import { useState } from "react";
import UserContext from "../../../store/UserContextProvider";

function SignIn() {
    const {user, dispatch} = use(UserContext);
    const [userInput, setUserInput] = useState("");
    const [passInput, setPassInput] = useState("");

    const handleUserInput = (e) => setUserInput(e.target.value);
    const handlePassInput = (e) => setPassInput(e.target.value);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(userInput, passInput);
    }

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
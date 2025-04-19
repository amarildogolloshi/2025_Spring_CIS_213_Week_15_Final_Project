import { useReducer } from "react";
import { createContext } from "react";
import { initialState, userReducer } from "../reducers/UserReducer";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, dispatch] = useReducer(userReducer, initialState);
    const [userls, setUserLs, removeUserLs] = useLocalStorage("user", { isLoggedIn: false });
    const [tokenls, setTokenLs, removeTokenLs] = useLocalStorage("token", null);

    const login = (userData, jwtToken) => {
        setUserLs({ ...userData, isLoggedIn: true });
        setTokenLs(jwtToken);
    };

    const logout = () => {
        removeUserLs();
        removeTokenLs();
        // dispatch({ type: "LOGOUT" });
    };

    return (
        <UserContext.Provider value={{ user, dispatch, login, logout }}>
            { children }
        </UserContext.Provider>
    );
}

export default UserContext;
import { useReducer } from "react";
import { createContext } from "react";
import { initialState, userReducer } from "../reducers/UserReducer";

const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            { children }
        </UserContext.Provider>
    );
}

export default UserContext;
import { v4 as uuidv4 } from "uuid";

// Initial state
export const initialState = [];

export function userReducer(state, action) {
    switch (action.type) {
        case "SIGN_IN":
            // Try to find the user
            const userData = DATA.find((user) => 
                user.username == action.payload.username && user.password == action.payload.password
            );

            if (userData) {
                // Successful sign in
                return {
                    ...userData,
                    isLoggedIn: true,
                };
            } else {
                // Unsuccessful sign in
                return state;
            }
        
        case "SIGN_UP":
            // Possibly perform validation
            const newUser = {
                "id": uuidv4(),
                "isLoggedIn": false,
                "username": action.payload.username,
                "password": action.payload.password,
                "email": action.payload.email,
                "company": action.payload.company,
                "events": [],
            }

            // Add to new user to DATA
            DATA.push(newUser);

            // TODO - validate on backend
            let backendValidation = true;
            if (backendValidation) {
                return {
                    ...newUser,
                    isLoggedIn: true,
                };
            } else {
                setUser({ isLoggedIn: false });
                return state;
            }
        case "LOGOUT":

            return []
        default:
            return state;
    }
}

const DATA = [
    {
        id: uuidv4(),
        isLoggedIn: false,
        username: "user",
        password: "pass1234",
        company: "CatMouse",
        email: "user@catmouse.net",
        events: [
            {
                id: uuidv4(),
                name: "Event 1",
                eventMembers: [
                    {
                        firstName: "Sally",
                        lastName: "Twoshoes",
                    },
                    {
                        firstName: "Bart",
                        lastName: "Simpson",
                    },
                ]
            },
        ],
        members: [
            {
                firstName: "Sally",
                lastName: "Twoshoes",
            },
            {
                firstName: "Bart",
                lastName: "Simpson",
            },
        ],
    },

];
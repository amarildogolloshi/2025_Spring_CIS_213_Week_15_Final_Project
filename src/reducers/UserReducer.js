import { v4 as uuidv4 } from "uuid";

// Initial state
export const initialState = [];

export function userReducer(state, action) {
    let  userData = null;
    switch (action.type) {
        case "LOAD_USER":
            userData = JSON.parse(localStorage.getItem("user"));
            if (userData) {
                return {  ...userData };
            } else {
                return state
            }

            
        case "SIGN_IN":
            console.log("SIGN_IN")
            // Try to find the user
            userData = DATA.find((user) => 
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
                return state;
            }
        case "LOGOUT":
            return []
        case "ADD_MEMBER":
            // Backend validation
            let backendValidation2 = true;
            if (backendValidation2) {
                return {
                    ...state,   // Unpack all state info
                    members: [
                        ...state.members,   // Unpack previous members
                        {                   // Add new member
                            "id": uuidv4(),
                            ...action.payload,
                        }
                    ]
                }
            }

            return state;
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
                eventMembers: [12345, 12346],
            },
        ],
        members: [
            {
                id: 12345,
                firstName: "Sally",
                lastName: "Twoshoes",
                socialLink: "https://google.com",
            },
            {
                id: 12346,
                firstName: "Bart",
                lastName: "Simpson",
                socialLink: "https://google.com",
            },
        ],
    },

];
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
                return userData;
            } else {
                // Unsuccessful sign in
                return state;
            }
            
        default:
            return state;
    }
}

const DATA = [
    {
        id: uuidv4(),
        username: "user",
        password: "pass123",
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
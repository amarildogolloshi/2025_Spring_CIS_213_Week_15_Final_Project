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
        case "SET_SIGN_IN":
            console.log("SET_SIGN_IN")
            
            return {
                ...state,   // Unpack all state info
                ...action.payload,
                isLoggedIn: true,
            };
        
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

        case "ADD_EVENT":
            // Backend validation
            let backendValidation3 = true;
            if (backendValidation3) {
                return {
                    ...state,   // Unpack all state info
                    events: [
                        ...state.events,    // Unpack previous events
                        {                   // Add new event
                            id: uuidv4(),
                            ...action.payload,
                        },
                    ]
                }
            }

        case "UPDATE_MEMBER":
            // Backend validation
            let backendValidation4 = true;
            if (backendValidation4) {

                return {
                    ...state,   // Unpack all state info
                    // Find and update target member using payload id
                    members: state.members.map((member) => member.id == action.payload.id ? 
                        action.payload : member
                    ),
                }
            }

            return state;    
        
        case "UPDATE_EVENT_MEMBERS":
            let backendValidation6 = true;
            if (backendValidation6) {
                return {
                    ...state,    // Unpack all state info
                    // Add new member to the target event
                    events: state.events.map((event) => 
                        event.id == action.payload.eventId ? 
                        {
                            ...event,
                            eventMembers: action.payload.memberIds,
                        }
                        : event
                    )
                }
            }

            return state;

        case "DELETE_MEMBER":
            // Backend validation
            let backendValidation5 = true;
            if (backendValidation5) {

                userData = JSON.parse(localStorage.getItem("user"));
                if (userData) {
                    userData.members = userData.members.filter((member) => member.id !== action.payload.id);
                    // Save it back to localStorage
                    localStorage.setItem("user", JSON.stringify(userData));
                } 
                
                return {
                    ...state,   // Unpack all state info
                    // Filter out target member
                    members: state.members.filter((member) => member.id != action.payload.id),
                }
            }

            return state;

        case "LOGOUT":
            return []
        case "ADD_MEMBER":
            // Backend validation
            let backendValidation2 = true;
            if (backendValidation2) {

                userData = JSON.parse(localStorage.getItem("user"));
                if (userData) {
                    console.log(action.payload)
                    userData.members = [...userData.members, action.payload];
                    // Save it back to localStorage
                    localStorage.setItem("user", JSON.stringify(userData));
                } 



                return {
                    ...state,   // Unpack all state info
                    members: [
                        ...state.members,   // Unpack previous members
                        {                   // Add new member
                            "id": uuidv4(),
                            followerInit: 500,
                            followerCurrent: 600,
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
                eventMembers: ["12345abc", "12346efg"],
                startTime: "2025-04-15T10:04",
                endTime: "2025-04-16T10:04"
            },
        ],
        members: [
            {
                id: "12345abc",
                firstName: "Sally",
                lastName: "Twoshoes",
                socialLink: "https://google.com",
                followerInit: 1000,
                followerCurrent: 1100,
            },
            {
                id: "12346efg",
                firstName: "Bart",
                lastName: "Simpson",
                socialLink: "https://google.com",
                followerInit: 900,
                followerCurrent: 850,
            },
        ],
    },

];
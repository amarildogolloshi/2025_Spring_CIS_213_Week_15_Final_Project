import { useContext, useEffect } from "react";
import UserContext from "../../store/UserContextProvider";
import { useNavigate } from "react-router-dom";
import PrivateLayout from "../../components/private/PrivateLayout";
import EventCards from "./EventCards/EventCards";

function Dashboard() {
    
    const {user} = useContext(UserContext);
    // const userData = JSON.parse(localStorage.getItem("user"));    
    const navigate = useNavigate();
    
    console.log("Dashboard user: " + user)
    console.log(user?.isLoggedIn)
    // console.log("userData:" + userData?.isLoggedIn)

    //Only redirect when "user" changes
    useEffect(() => {
        console.log("Dashboard:useEffect")
        if (!user?.isLoggedIn) {
            navigate("/signin");
        }
    }, [user?.isLoggedIn]);

    return (
        <PrivateLayout>
            
            <p> Welcome to the Dashboard: {user?.username || "Guest"} </p>
            {
                user.events.map((event) => (
                    <EventCards key={event.id} eventID={event.id} memberIDS={event.eventMembers} />
                ))
            }
            
        </PrivateLayout>
        
    ) 
}

export default Dashboard;
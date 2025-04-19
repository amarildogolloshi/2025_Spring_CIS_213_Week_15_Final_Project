import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";

function EventsShowAll() {
    
    const {user} = useContext(UserContext);
    // const userData = JSON.parse(localStorage.getItem("user"));    
    const navigate = useNavigate();

    //Only redirect when "user" changes
    useEffect(() => {
        if (!user?.isLoggedIn) {
            navigate("/signin");
        }
    }, [user?.isLoggedIn]);

    return (
        <PrivateLayout>
            <p>EventsShowAll</p>
        </PrivateLayout>
        
    ) 
}

export default EventsShowAll;
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";
import tableStyles from '../../TableStyles.module.css';
import MemberSelection from "../../../components/MemberSelection/MemberSelection";

function EventsShowAll() {
    
    const {user} = useContext(UserContext);
    // const userData = JSON.parse(localStorage.getItem("user"));    
    const navigate = useNavigate();

    console.log("EventsShowAll user: " + JSON.stringify(user))


    //Only redirect when "user" changes
    useEffect(() => {
        if (!user?.isLoggedIn) {
            navigate("/signin");
        }
    }, [user?.isLoggedIn]);

    return (
        <PrivateLayout>
            <h3>View Events</h3>
            <section style={{"marginBottom": "1em"}}>
                <table className={tableStyles.table}>
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Total Members</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.events.map((event) => (
                            <tr key={event.id}>
                                <th>{event.name}</th>
                                <td>{event.startTime}</td>
                                <td>{event.endTime}</td>
                                <td>{event.members.length}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="3">Total events</th>
                            <td>{user.events.length}</td>
                        </tr>
                    </tfoot>
                </table>
            </section>

            <MemberSelection />
        </PrivateLayout>
        
    ) 
}

export default EventsShowAll;
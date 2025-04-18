import { useContext, useEffect } from "react";
import UserContext from "../../store/UserContextProvider";
import { useNavigate } from "react-router";

function Dashboard() {
    
    const {user, dispatch} = useContext(UserContext);
    const navigate = useNavigate();

    // Only redirect when "user" changes
    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate("/signin");
        }
    }, [user]);

    return (
        <section>
            Welcome to the Dashboard: {user.username}
        </section>
    );
}

export default Dashboard;
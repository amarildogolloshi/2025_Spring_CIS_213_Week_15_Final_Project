import { use } from "react";
import UserContext from "../../../store/UserContextProvider";

function Dashboard() {
    const {user, dispatch} = use(UserContext);
    
    return (
        <section>
            Welcome to the Dashboard: {user.username}
        </section>
    );
}

export default Dashboard;
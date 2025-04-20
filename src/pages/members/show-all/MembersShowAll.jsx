import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";

function MembersShowAll() {
    
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
            <h3>View All Members</h3>
            <ul>
                {
                    user.members.map((member) => 
                        <li key={member.id}>
                            {member.firstName}
                            {member.lastName}
                            {member.socialLink}
                        </li>
                    )
                }
            </ul>
        </PrivateLayout>
        
    ) 
}

export default MembersShowAll;
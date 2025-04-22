import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";
import tableStyles from '../../TableStyles.module.css';
import TableRow from "../table-row/TableRow";

function MembersShowAll() {
    const {user, dispatch} = useContext(UserContext);
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
            <table className={tableStyles.table}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Social Link</th>
                        <th>Follower Start</th>
                        <th>Follower Current</th>
                        <th>Edit Member</th>
                        <th>Delete Member</th>
                    </tr>
                </thead>
                <tbody>
                    {user.members.map((member) => (
                        <TableRow key={member.id}
                            id={member.id}
                            firstName={member.firstName} 
                            lastName={member.lastName} 
                            socialLink={member.socialLink}
                            followerStart={member.followerInit}
                            followerCurrent={member.followerCurrent}
                        />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="6">Total members</th>
                        <td>{user.members.length}</td>
                    </tr>
                </tfoot>
            </table>
        </PrivateLayout>
        
    ) 
}

export default MembersShowAll;
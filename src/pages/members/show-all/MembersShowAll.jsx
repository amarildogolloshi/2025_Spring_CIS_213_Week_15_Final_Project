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

    // console.log("MembersShowAll user: " + JSON.stringify(user.members))
    // console.log("MembersShowAll user: " + user?.isLoggedIn)

    //Only redirect when "user" changes
    useEffect(() => {
        if (!user?.isLoggedIn) {
            navigate("/signin");
        }
    }, [user?.isLoggedIn]);

    return (
        <PrivateLayout>
            <table className={tableStyles.table}>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Username</th>
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
                            fullName={member.name} 
                            userName={member.username} 
                            followerStart={member.followers_init}
                            followerCurrent={member.followers_current}
                        />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="5">Total members</th>
                        <td>{user.members.length}</td>
                    </tr>
                </tfoot>
            </table>
        </PrivateLayout>
        
    ) 
}

export default MembersShowAll;
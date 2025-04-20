import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";
import styles from '../Members.module.css';
import tableStyles from '../../TableStyles.module.css';

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
            <table className={tableStyles.table}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Social Link</th>
                    </tr>
                </thead>
                <tbody>
                    {user.members.map((member) => (
                        <tr key={member.id}>
                            <th>{member.firstName}</th>
                            <td>{member.lastName}</td>
                            <td>{member.socialLink}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="2">Total members</th>
                        <td>{user.members.length}</td>
                    </tr>
                </tfoot>
            </table>
        </PrivateLayout>
        
    ) 
}

export default MembersShowAll;
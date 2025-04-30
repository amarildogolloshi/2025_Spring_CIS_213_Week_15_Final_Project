import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";
import tableStyles from '../../TableStyles.module.css';
import TableRow from "../table-row/TableRow";

function SchedularShowAll() {
    const {user, dispatch} = useContext(UserContext);
    const [openPanel, setOpenPanel] = useState({ isOpen: false, chartData: [], name: "" });
    // const userData = JSON.parse(localStorage.getItem("user"));    

    const navigate = useNavigate();

    // console.log("MembersShowAll user: " + JSON.stringify(user.members))
    // console.log("MembersShowAll user: " + user?.isLoggedIn)

    console.log("openPanel: " + openPanel)
    
    function handleClosePanel() {
        setOpenPanel({ isOpen: false, chartData: [], name: ""});
    }

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
                        <th>Type</th>
                        <th>Interval</th>
                        <th>Last Run</th>
                        <th>Next Run</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {user.tasks.length > 0 ? (
                        user.tasks.map((task) => (
                            <TableRow key={task.id}
                                id={task.id}
                                type={task.type}
                                interval={task.interval} 
                                last_run={task.last_run} 
                                next_run={task.next_run}
                                is_active={task.is_active}
                            />
                        ))
                    ): (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>
                                No data found
                            </td>
                        </tr>
                    )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="5">Total Tasks</th>
                        <td>{user.tasks.length}</td>
                    </tr>
                </tfoot>
            </table>
        </PrivateLayout>
        
    ) 
}

export default SchedularShowAll;
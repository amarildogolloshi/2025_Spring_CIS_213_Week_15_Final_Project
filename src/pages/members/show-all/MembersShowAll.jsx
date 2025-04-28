import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";
import tableStyles from '../../TableStyles.module.css';
import TableRow from "../table-row/TableRow";
import RechartsPanel from "../../../components/RechartsPanel/RechartsPanel";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";

function MembersShowAll() {
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
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Follower Start</th>
                        <th>Follower Current</th>
                        <th>Followers Chart</th>
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
                            chartData={member.chart}
                            setOpenPanel={setOpenPanel}
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
            {/* Recharts Panel Component */}
            <RechartsPanel isOpen={openPanel.isOpen} setOpenPanel={() => setOpenPanel({ isOpen: false, chartData: [] })}>
                {openPanel.chartData && (
                  
                    
                    <ResponsiveContainer width="100%" height="80%">
                    <h3>Followers chart of {openPanel.name} </h3>
                        <LineChart width={300} height={100} data={openPanel.chartData}>
                            <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
                            <XAxis />
                            <YAxis />
                        </LineChart>
                    </ResponsiveContainer>
                    
                )}
            </RechartsPanel>
        </PrivateLayout>
        
    ) 
}

export default MembersShowAll;
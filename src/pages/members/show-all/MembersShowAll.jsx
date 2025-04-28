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

    const [searchQuery, setSearchQuery] = useState(""); 

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

    // Filter members based on the search query
    const filteredMembers = user.members.filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.username.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <PrivateLayout>
            <div>
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by name or username"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        marginBottom: "20px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        width: "100%"
                    }}
                />
            </div>
            <table className={tableStyles.table}>
                <thead>
                    <tr>
                        <th>Photo</th>
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
                    {filteredMembers.length > 0 ? (
                        filteredMembers.map((member) => (
                            <TableRow key={member.id}
                                id={member.id}
                                photo={member.photo}
                                fullName={member.name} 
                                userName={member.username} 
                                followerStart={member.followers_init}
                                followerCurrent={member.followers_current}
                                chartData={member.chart}
                                setOpenPanel={setOpenPanel}
                            />
                        ))
                    ): (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>
                                No members found
                            </td>
                        </tr>
                    )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="7">Total members</th>
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
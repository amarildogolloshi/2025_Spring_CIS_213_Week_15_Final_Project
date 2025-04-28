import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";
import styles from './MembersCards.module.css';
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
import MemberCard from "../../../components/MemberCard/MemberCard";

function MembersCards() {
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
            <div className={styles["cards-container"]}>
                {filteredMembers.length > 0 ? (
                        filteredMembers.map((member) => (
                            <MemberCard  member = {member} key={member.id}/>
                        ))
                    ): (
                        <div>
                            <p> No members found</p>
                        </div>
                    )
                }
            </div>
        </PrivateLayout>
        
    ) 
}

export default MembersCards;
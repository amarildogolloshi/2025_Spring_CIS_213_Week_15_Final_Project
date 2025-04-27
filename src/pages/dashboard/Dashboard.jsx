import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/UserContextProvider";
import { useNavigate } from "react-router-dom";
import PrivateLayout from "../../components/private/PrivateLayout";
import useApi from "../../hooks/useAPI";
import DynamicMessage from "../../components/DynamicMessage/DynamicMessage";
import DashboardCard from "../../components/DashboardCard/DashboardCard";

import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

function Dashboard() {
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("success");

    const {user} = useContext(UserContext);
    
    // const userData = JSON.parse(localStorage.getItem("user"));    
    const navigate = useNavigate();

    
    // console.log("Dashboard user: " + user)
    // console.log(user?.isLoggedIn)
    // console.log("userData:" + userData?.isLoggedIn)

    // Hook for the API call (Initialize with no payload)
    const { data, loading, error, refetch } = useApi("/api/dashboard", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });


    //Only redirect when "user" changes
    useEffect(() => {
        console.log("Dashboard:useEffect")
        console.log("data:", data)
        console.log("data:", data?.data)
        console.log("error:", error)
        if(error) {
            setMessage("Error fetching data: " + error);
            setMessageType("error");
        }

        if (!user?.isLoggedIn) {
            navigate("/signin");
        }
    }, [data, user?.isLoggedIn]);

    console.log("user: ", user);

    return (
        <PrivateLayout>
            {message && <DynamicMessage type={messageType} message={message} />}

            
            {loading && <p>Loading...</p>}
            
            { data ? (
                <>
                <div className={styles.dashboardSection}>
                    <h2>Quick Overview</h2>
                    
                    <div className={styles.cardsContainer}>
                        {data.data.map((item) => (
                                <Link to={item.link} key={item.id} className={styles.cardLink} >  
                                <DashboardCard title={item.name}
                                    description={item.value}
                                />
                                </Link>
                            ))
                        } 
                    </div>
                
                </div>
                </>
            ) : (
                !loading && <p>No data available.</p>
            )
            }

            
        </PrivateLayout>
        
    ) 
}

export default Dashboard;
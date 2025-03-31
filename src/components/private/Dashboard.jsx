import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Redirect to login if no token found
        }
    }, [navigate]);

    return <div>Welcome to your dashboard!</div>;
};

export default Dashboard;

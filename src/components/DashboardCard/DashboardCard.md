import DashboardCard from "./DashboardCard";

const Dashboard = () => {
    return (
        <div>
            <DashboardCard
                title="Analytics"
                description="View your data insights and analytics."
                icon={<span>📊</span>} // Replace with an actual icon if needed
                onClick={() => console.log("Analytics clicked")}
            />
        </div>
    );
};

export default Dashboard;

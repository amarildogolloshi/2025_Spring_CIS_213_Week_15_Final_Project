
import styles from './MemberCard.module.css';
import { FaArrowUp, FaArrowDown  } from "react-icons/fa";
import { NumericFormat } from "react-number-format";

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


const MemberCard = ({ member }) => {

    const baseUrl = import.meta.env.VITE_API_URL;

    return (
        <div className={styles["profile-card"]}>
            <div className={styles["profile-header"]}>
                <img src={baseUrl + "/static/image/" + member.photo} alt="" className={styles["profile-picture"]}   />
                
                <h1 className={styles["profile_name"]}>{ member.name }</h1>
                <p className={styles["profile_username"]}>{ member.username }</p>
            </div>
            <div className={styles["profile-stats"]}>
                {/* <!-- <h2>Followers</h2> --> */}
                <div className={styles["stat"]}>
                    <h2>Before</h2>
                    <NumericFormat
                       value={member.followers_init }
                       thousandSeparator=","  
                        displayType="text"
                    />
                </div>
                <div className={styles["stat"]}>
                    <h2>Current</h2>
                    <NumericFormat
                       value={member.followers_current }
                       thousandSeparator=","  
                        displayType="text"
                    />
                </div>
                
                {member.followers_difference > 0 ? (
                    <div className={`${styles["stat"]} ${styles["follower-difference"]}`} >
                        <FaArrowUp style={{ color: "#0086e6" }} />
                            <NumericFormat
                            value={Math.abs(member.followers_difference) }
                            thousandSeparator=","  
                                displayType="text"
                            />
                    </div>
                ) : (
                    <div className={`${styles["stat"]} ${styles["follower-difference"]} `} >
                        <FaArrowDown style={{ color: "red", }} />
                            <NumericFormat
                                value={Math.abs(member.followers_difference) }
                            thousandSeparator=","  
                                displayType="text"
                            />
                    </div>
                )}
                
            </div>
            <div className={styles["profile-chart"]}>
                <h3>Followers Chart</h3>
                 <LineChart width={300} height={100} data={member.chart}>
                    <Line type="monotone" dataKey="followers" stroke="#8884d8" strokeWidth={2} dot="none"/>
                    <Tooltip />
                    <XAxis />
                    <YAxis />
                </LineChart>
            </div>
      </div>
    )
}

export default MemberCard
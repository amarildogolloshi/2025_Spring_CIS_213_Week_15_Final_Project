import { useContext, useEffect, useState } from "react";
import UserContext from "../../../store/UserContextProvider";
import useInput from "../../../hooks/useInput";
import styles from "./TableRow.module.css";
import useApi from "../../../hooks/useAPI";
import DynamicMessage from "../../../components/DynamicMessage/DynamicMessage";
import { FaChartBar } from "react-icons/fa";

// Component for updating Member information inside the View All Members table.
function TableRow({ id, fullName, userName, followerStart, followerCurrent, setOpenPanel, chartData }) {
    const {user, dispatch} = useContext(UserContext);
    const [editView, setEditView] = useState(false);
    const [fullNameController, fNameErrorController] = useInput(fullName);
    const [userNameController, lNameErrorController] = useInput(userName);
    const [followersStartController] = useState(followerStart);
    const [followersCurrentController] = useState(followerCurrent);

    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("success");

    // console.log(id+ " - " + fullName + " - " + userName + " - " + followerStart + " - " + followerCurrent)

    // Hook for the API call (Initialize with no payload)
    const { data, loading, error, refetch } = useApi("/api/members/"+id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: fullNameController.value,
            username: userNameController.value,
            followers_init: followersStartController,
            followers_current: followersCurrentController,
        }),
    }, false);

    const { data:dataDelete, loading:loadingDelete, error:errorDelete, refetch:refetchDelete } = useApi("/api/members/"+id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }, false);

    function handleViewChartBtn() {
        // TODO - implement chart view
        console.log("View chart for: " + fullNameController.value);
        console.log("Chart data: " + chartData);
        setOpenPanel({isOpen: true, chartData: chartData, name: fullNameController.value});
    }

    // Handles updating of an individual member
    function handleUpdate() {
        // TODO - frontend validation
        let validationChecks = true;
        if (validationChecks) {
             // Dispatch the update action
             dispatch({
                type: "UPDATE_MEMBER",
                payload: {
                    id,
                    name: fullNameController.value,
                    username: userNameController.value,
                    followers_init: followersStartController,
                    followers_current: followersCurrentController,
                }
            })
            
            // Exit edit view
            setEditView(prevEdit => !prevEdit);
            
            // Send PUT request to backend
            refetch(true);
        }

        // // Exit edit view
        // setEditView(prevEdit => !prevEdit);
    }

    // Toggles visibility state of "Edit View"
    const handleEditBtn = () => setEditView(prevEdit => !prevEdit);

    // Handles deletion of a member
    function handleDeleteBtn() {
        // Confirm deletion
        if (confirm(`Are you sure you want to permanently delete member: ${fullNameController.value}`)) {
            // Action confirmed
            dispatch({
                type: "DELETE_MEMBER",
                payload: {
                    id: id
                }
            })

            refetchDelete(true);
        } else {
            // Action canceled
            return;
        }
    }

    useEffect(() => {
        console.log("TableRow:useEffect")  
            if (error) {
                console.log("Error:", error)
                setMessage("Error fetching data: " + error);
                setMessageType("error");
            }
    
            if (data && !error) {
                // console.log("Login user:", user)
                // console.log("Login data:", data)
                // console.log("Login data:", data.user)
                // login(user, data.access_token );

            }
 
        }, [data, error, dispatch, id, fullNameController.value, userNameController.value, followersStartController, followersCurrentController]);
    
    return (
        <tr>
            {editView ?
            <>
                <td>
                    <input type="text" value={fullNameController.value}
                        onChange={(e) => fullNameController.handleUpdateValue(e.target.value)}
                    />
                </td>
                <td>
                    <input type="text" value={userNameController.value}
                        onChange={(e) => userNameController.handleUpdateValue(e.target.value)}
                    />
                </td>
                <td>{followerStart}</td>
                <td>{followerCurrent}</td>
                <td>
                    <button className={styles.btnChart} disabled><FaChartBar /></button>
                </td>
                <td className={styles.tdMultiBtn}>
                    <button className={styles.updateBtn + " " + styles.btn} onClick={handleUpdate}>Update</button>
                    <button className={styles.toggleBtn + " " + styles.btn} onClick={handleEditBtn}>Cancel</button>
                </td>
                <td>
                    <button className={styles.deleteBtn + " " + styles.btn} onClick={handleDeleteBtn}>Delete</button>
                </td>
            </>
            :   
            <>
                <td>{fullName}</td>
                <td>{userName}</td>
                <td>{followerStart}</td>
                <td>{followerCurrent}</td>
                <td>
                    <button className={styles.btnChart + " " + styles.btn} onClick={handleViewChartBtn}><FaChartBar /></button>
                </td>
                <td>
                    <button className={styles.toggleBtn + " " + styles.btn} onClick={handleEditBtn}>Edit</button>
                </td>
                <td>
                    <button className={styles.deleteBtn + " " + styles.btn} onClick={handleDeleteBtn}>Delete</button>
                </td>
            </>
            }
        </tr>
    );
}

export default TableRow;
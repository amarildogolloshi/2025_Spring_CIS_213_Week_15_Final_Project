import { useContext, useEffect, useState } from "react";
import UserContext from "../../../store/UserContextProvider";
import useInput from "../../../hooks/useInput";
import styles from "./TableRow.module.css";
import useApi from "../../../hooks/useAPI";
import DynamicMessage from "../../../components/DynamicMessage/DynamicMessage";
import { FaChartBar } from "react-icons/fa";

// Component for updating Member information inside the View All Members table.
function TableRow({ id, type, interval, last_run, next_run, is_active}) {
    const {user, dispatch} = useContext(UserContext);
    const [editView, setEditView] = useState(false);
    const [typeController, typeErrorController] = useInput(type);
    const [intervalController, intervalErrorController] = useInput(interval);
    const [lastRunController] = useState(last_run);
    const [nextRunController] = useState(next_run);

    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("success");

    const baseUrl = import.meta.env.VITE_API_URL;

    // console.log(id+ " - " + fullName + " - " + userName + " - " + followerStart + " - " + followerCurrent)

    // Hook for the API call (Initialize with no payload)
    const { data, loading, error, refetch } = useApi("/api/scheduler/"+id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: typeController.value,
            interval: intervalController.value,
            last_run: lastRunController,
            next_run: nextRunController,
            is_active:is_active,
        }),
    }, false);

    const { data:dataDelete, loading:loadingDelete, error:errorDelete, refetch:refetchDelete } = useApi("/api/scheduler/"+id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }, false);

    // Handles updating of an individual member
    function handleUpdate() {
        // TODO - frontend validation
        let validationChecks = true;
        if (validationChecks) {

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
        if (confirm(`Are you sure you want to permanently delete this task?`)) {
            // Action confirmed
            dispatch({
                type: "DELETE_TASK",
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
        if (error) {
            setMessage("Error fetching data: " + error);
            setMessageType("error");
        }

        if (data && !error) {
            // Dispatch the update action
            dispatch({
                type: "UPDATE_TASK",
                payload: {
                    id:id,
                    type: typeController.value,
                    interval: intervalController.value,
                    last_run: lastRunController,
                    next_run: nextRunController,
                }
            })
            
            // Exit edit view
            setEditView(prevEdit => !prevEdit);
        }

    }, [data, error, dispatch]);
    
    return (
        <tr>
            {editView ?
            <>
                <td>
                    <select  value={typeController.value} onChange={(e) => typeController.handleUpdateValue(e.target.value)}>
                        <option value="">None</option>
                        <option value="scheduled_task_instagram_sync">Instagram Synchronize followers</option>
                    </select>
                </td>
                <td>
                    <input type="number" value={intervalController.value}
                        onChange={(e) => intervalController.handleUpdateValue(e.target.value)}
                    />
                </td>
                <td>{last_run}</td>
                <td>{next_run}</td>
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
                <td>
                    <select className={styles.selectViewMode} value={typeController.value} onChange={(e) => typeController.handleUpdateValue(e.target.value)} disabled>
                        <option value="">None</option>
                        <option value="scheduled_task_instagram_sync">Instagram Synchronize followers</option>
                    </select>
                </td>
                <td>{interval}</td>
                <td>{last_run}</td>
                <td>{next_run}</td>
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
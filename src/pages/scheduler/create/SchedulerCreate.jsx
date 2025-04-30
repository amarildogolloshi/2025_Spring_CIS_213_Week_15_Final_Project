import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";
import useInput from "../../../hooks/useInput";
import styles from '../Scheduler.module.css';
import useApi from "../../../hooks/useAPI";
import DynamicMessage from "../../../components/DynamicMessage/DynamicMessage";

const ERROR_STYLE = {"color": "var(--error-red)"};
const SUCCESS_STYLE = {"color": "var(--success-green)"};

function SchedularCreate() {
    const {user, dispatch} = useContext(UserContext);
    const [operationFeedback, setOperationFeedback] = useState("");
    const [typeController, typeErrorController] = useInput("");
    const [intervalController, intervalErrorController] = useInput("");
    
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("success");

    // const userData = JSON.parse(localStorage.getItem("user"));    
    const navigate = useNavigate();

    // Hook for the API call (Initialize with no payload)
    const { data:taskDataCreate, loading:taskLoadingCreate, error:taskErrorCreate, refetch:taskRefetchCreate } = useApi("/api/scheduler/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: typeController.value,
            interval: intervalController.value,
            created_by: user.user.id,
        }),
    }, false);

    function handleSubmit(e) {
        e.preventDefault();
        let rCode = true;   // Assume valid form

        // Check for initial errors
        // Check type
        if (typeController.value == "") {
            // Ensure errorController's error state is true
            if (!typeErrorController.error) {
                typeErrorController.handleUpdateError("Type cannot be empty.");
            }
            rCode = false;
        } else {
            // If first name contains no errors, ensure error state is false
            if (typeErrorController.error) {
                typeErrorController.handleUpdateError();
            }
        }

        // Check interval
        if (intervalController.value == "" || intervalController.value == 0) {   
            // Ensure errorController's error state is true
            if (!intervalErrorController.error) {
                intervalErrorController.handleUpdateError("The interval can not be empty or zero.");
            }
            rCode = false;
        } else {
            // If last name contains no errors, ensure error state is false
            if (intervalErrorController.error) {
                intervalErrorController.handleUpdateError();
            }
        }

        // If no errors were found, process form
        if (rCode) {

            // Send PUT request to backend
            taskRefetchCreate(true);
        }
    }

    useEffect(() => {
        console.log("Task Create:useEffect")  
            if (taskErrorCreate) {
                console.log("Error:", taskErrorCreate)
                setMessage("Error fetching data: " + taskErrorCreate);
                setMessageType("error");
            }
    
            if (taskDataCreate && !taskErrorCreate) {
                console.log("Task data:", taskDataCreate)
                console.log("Task data:", taskDataCreate.task)
                if (taskDataCreate.success) {
                    setMessage( taskDataCreate?.message);
                    setMessageType("success");
                }
                //Dispatch ADD_MEM
                dispatch({
                    type: "ADD_TASK",
                    payload: taskDataCreate.task
                });

                // Provide success feedback & reset input values
                setOperationFeedback(`Task successfully created.`);
                typeController.handleUpdateValue("");
                intervalController.handleUpdateValue("");

            }
 
        }, [taskDataCreate, taskErrorCreate]);

    return (
        <PrivateLayout>
            {message && <DynamicMessage type={messageType} message={message} />}

            <h2>Create a new Task</h2>
            <span style={SUCCESS_STYLE}>{operationFeedback}</span>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label>Type: </label>
                    <span style={ERROR_STYLE}>
                        {typeErrorController.error && typeErrorController.errorMessage}
                    </span>
                    <select value={typeController.value} onChange={(e) => typeController.handleUpdateValue(e.target.value)}>
                        <option value="">None</option>
                        <option value="scheduled_task_instagram_sync">Instagram Synchronize followers</option>
                    </select>
                </div>
                <div>
                    <label>Interval (minutes): </label>
                    <span style={ERROR_STYLE}>
                        {intervalErrorController.error && intervalErrorController.errorMessage}
                    </span>
                    <input type="number" value={intervalController.value}
                        onChange={(e) => intervalController.handleUpdateValue(e.target.value)}
                    />
                </div>
                
                <button type="submit">Create Task</button>
            </form>
        </PrivateLayout>
        
    ) 
}

export default SchedularCreate;
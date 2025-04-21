import { useContext, useState } from "react";
import UserContext from "../../../store/UserContextProvider";
import useInput from "../../../hooks/useInput";

// Component for updating Member information inside the View All Members table.
function TableRow({ id, firstName, lastName, socialLink }) {
    const {user, dispatch} = useContext(UserContext);
    const [editView, setEditView] = useState(false);
    const [fNameController, fNameErrorController] = useInput(firstName);
    const [lNameController, lNameErrorController] = useInput(lastName);
    const [mediaController, mediaErrorController] = useInput(socialLink);

    // Handles updating of an individual member
    function handleUpdate() {
        // TODO - frontend validation
        let validationChecks = true;
        if (validationChecks) {
            dispatch({
                type: "UPDATE_MEMBER",
                payload: {
                    id,
                    firstName: fNameController.value,
                    lastName: lNameController.value,
                    socialLink: mediaController.value,
                }
            })
        }

        // Exit edit view
        setEditView(prevEdit => !prevEdit);
    }

    // Toggles visibility state of "Edit View"
    const handleEditBtn = () => setEditView(prevEdit => !prevEdit);

    // Handles deletion of a member
    function handleDeleteBtn() {
        // Confirm deletion
        if (confirm(`Are you sure you want to permantly delete member: ${fNameController.value}`)) {
            // Action confirmed
            dispatch({
                type: "DELETE_MEMBER",
                payload: {
                    id: id
                }
            })
        } else {
            // Action canceled
            return;
        }
    }
    
    return (
        <tr>
            {editView ?
            <>
                <td>
                    <input type="text" value={fNameController.value}
                        onChange={(e) => fNameController.handleUpdateValue(e.target.value)}
                    />
                </td>
                <td>
                    <input type="text" value={lNameController.value}
                        onChange={(e) => lNameController.handleUpdateValue(e.target.value)}
                    />
                </td>
                <td>
                    <input type="text" value={mediaController.value}
                        onChange={(e) => mediaController.handleUpdateValue(e.target.value)}
                    />
                </td>
                <td>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleEditBtn}>Cancel</button>
                </td>
                <td>
                    <button onClick={handleDeleteBtn}>Delete</button>
                </td>
            </>
            :   
            <>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{socialLink}</td>
                <td>
                    <button onClick={handleEditBtn}>Edit</button>
                </td>
                <td>
                    <button onClick={handleDeleteBtn}>Delete</button>
                </td>
            </>
            }
        </tr>
    );
}

export default TableRow;
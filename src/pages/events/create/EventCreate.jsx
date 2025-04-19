import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";

function EventCreate() {
    return (
        <PrivateLayout>
            <p>EventCreate</p>
        </PrivateLayout>
    ) 
}

export default EventCreate;
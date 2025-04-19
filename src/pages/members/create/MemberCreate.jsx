import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContextProvider";
import PrivateLayout from "../../../components/private/PrivateLayout";

function MemberCreate() {
    
    const {user} = useContext(UserContext);
    // const userData = JSON.parse(localStorage.getItem("user"));    
    const navigate = useNavigate();

    return (
        <PrivateLayout>
             <p>MemberCreate</p>
        </PrivateLayout>
        
    ) 
}

export default MemberCreate;
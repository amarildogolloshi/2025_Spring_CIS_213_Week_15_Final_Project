

import ContactForm from "../../../ContactForm/ContactForm";
import PrivateLayout from "../../PrivateLayout";
import styles from "./Report.module.css";

function Report({children}) {
    const page = {
        "name" : "Report a problem" 
    }
    return (
        <PrivateLayout page={page}>
            <ContactForm messageType="report"/>
        </PrivateLayout>
    );
}

export default Report;
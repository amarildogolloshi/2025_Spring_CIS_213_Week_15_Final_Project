

import ContactForm from "../../../ContactForm/ContactForm";
import PrivateLayout from "../../PrivateLayout";
import styles from "./Feature.module.css";

function Feature({children}) {
    return (
        <PrivateLayout>
            <ContactForm messageType="feature"/>
        </PrivateLayout>
    );
}

export default Feature;
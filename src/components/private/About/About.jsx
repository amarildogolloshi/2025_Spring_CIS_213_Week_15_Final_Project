import AboutMission from "../../About/Mission/AboutMission";
import AboutTeam from "../../About/Team/Aboutteam";
import AboutValues from "../../About/Values/AboutValues";
import PrivateLayout from "../PrivateLayout";
import styles from "./About.module.css";

function About({children}) {
    return (
        <PrivateLayout>
            <AboutMission/>
            <AboutTeam/>
            <AboutValues/>
        </PrivateLayout>
    );
}

export default About;
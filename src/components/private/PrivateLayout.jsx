// import MainNavigation from "../navigation/MainNavigation"

import Logo from "../public/Logo";
import ScrollToTopButton from "../public/ScrollToTopBtn";

import styles from "./PrivateLayout.module.css";
import Sidebar from "./Sidebar/Sidebar";
import RightSection from "./RightSection/RightSection";
import Header from "./Header/Header"
import Main from "./Main/Main";
import UserProfileDropdown from "../UserProfileDropdown/UserProfileDropdown";

function PrivateLayout({ children }) {
    return (
        <div className={styles.container}>
            <Sidebar>
                <Logo variant="inverted"/>
                <p>Sidebar</p>
            </Sidebar>
            
            <RightSection>
                <Header>
                   <UserProfileDropdown userName="Amarildo" />
                </Header>
                <Main>
                    { children }
                    <h2>Main Content</h2>
                    <p>This is where your dashboard’s core content will go.</p>
                    <ScrollToTopButton />
                </Main>
                
            </RightSection>
            
        </div>
    );
}

export default PrivateLayout;
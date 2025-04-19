// import MainNavigation from "../navigation/MainNavigation"

import Logo from "../public/Logo";
import ScrollToTopButton from "../public/ScrollToTopBtn";

import styles from "./PrivateLayout.module.css";
import Sidebar from "./Sidebar/Sidebar";
import RightSection from "./RightSection/RightSection";
import Header from "./Header/Header"
import Main from "./Main/Main";
import UserProfileDropdown from "../UserProfileDropdown/UserProfileDropdown";
import Navigation from "./Navigation/Navigation";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

function PrivateLayout({ children }) {
    return (
        <div className={styles.container}>
            <Sidebar>
                <Logo variant="inverted"/>
                <Navigation />
            </Sidebar>
            
            <RightSection>
                <Header>
                   <UserProfileDropdown />
                   <Breadcrumb/>
                </Header>
                <Main>
                    { children }
                    <ScrollToTopButton />
                </Main>
                
            </RightSection>
            
        </div>
    );
}

export default PrivateLayout;
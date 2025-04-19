import { useLocation } from "react-router";
import styles from "./MainNavigation.module.css";
import HomeNav from "./nav-components/HomeNav";
import SignInNav from "./nav-components/SignInNav";

function MainNavigation() {
    const location = useLocation();
    let navRender = <HomeNav />

    // Logic for rendering different navigations
    switch (location.pathname) {
        case "/":
        case "/privacy-policy":
            navRender = <HomeNav />;
            break;
        case "/signin":
        case "/signup":
        case "/forgotpassword":
            navRender = <SignInNav />;
            break;
        case "/support":
            navRender = <HomeNav />;  // Support is a separate page; no nav
            break;
        default:
            navRender = <HomeNav />;
            break;
    };

    return (
        <nav className={styles.navigation}>
            { navRender }
        </nav>
    );
}

export default MainNavigation;
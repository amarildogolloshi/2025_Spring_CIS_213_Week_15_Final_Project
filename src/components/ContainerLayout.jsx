import Header from "./Header";
import Logo from "./Logo";
import Main from "./Main";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import { Link } from "react-router";

const ContainerLayout = ({children}) => {
    return(
        <div className="container">
            <Header>
                <Logo />
                <Navigation />    
            </Header>
            <Main>
                {children}
            </Main>
            <Footer>
                <Logo />
                <div  className="footer-content">
                    <div className="footer-copyright">
                        <p>Pulse &copy; 2025</p>
                        <p>All rights reserved</p>
                    </div>
                    <div className="footer-links">
                        <Link to="#privacy-policy">Privacy Policy</Link>
                        <Link to="#terms-and-conditions">Terms and Conditions</Link>
                    </div>
                </div>
                
                <ScrollToTopButton />
            </Footer>
        </div>
    )
}

export default ContainerLayout;
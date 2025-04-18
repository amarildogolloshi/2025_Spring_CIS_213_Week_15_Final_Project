// import MainNavigation from "../navigation/MainNavigation"
import Footer from "../public/Footer"
import Header from "../public/Header"
import Logo from "../public/Logo";
import ScrollToTopButton from "../public/ScrollToTopBtn";
import Main from "../public/Main";

function PrivateLayout({ children }) {
    return (
        <div className="container">
            <Header>
                <p>Logout</p>
            </Header>
            <Main>
                { children }
            </Main>
                
            <Footer>
                <ScrollToTopButton />
            </Footer>
        </div>
    );
}

export default PrivateLayout;
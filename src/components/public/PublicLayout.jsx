import MainNavigation from "./navigation/MainNavigation"
import Footer from "./Footer"
import Header from "./Header"
import Logo from "./Logo";
import ScrollToTopButton from "./ScrollToTopBtn";
import Main from "./Main";

function PublicLayout({ children }) {
    return (
        <div className="container">
            <Header>
                <Logo />
                <MainNavigation />
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

export default PublicLayout;
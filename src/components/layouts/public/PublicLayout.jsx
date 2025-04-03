import MainNavigation from "../../../navigation/MainNavigation"
import Footer from "./Footer"
import Header from "./Header"
import Logo from "./Logo";
import ScrollToTopButton from "./ScrollToTopBtn";

function PublicLayout({ children }) {
    return (
        <>
            <Header>
                <Logo />
                <MainNavigation />
            </Header>
            <main>
                { children }
            </main>
            <Footer>
                <ScrollToTopButton />
            </Footer>
        </>
    );
}

export default PublicLayout;
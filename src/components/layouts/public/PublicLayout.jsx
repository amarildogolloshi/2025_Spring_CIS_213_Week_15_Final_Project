import MainNavigation from "../../../navigation/MainNavigation"
import Footer from "./Footer"
import Header from "./Header"

function PublicLayout({ children }) {
    return (
        <>
            <Header>
                <MainNavigation />
            </Header>
            <main>
                { children }
            </main>
            <Footer />
        </>
    );
}

export default PublicLayout;
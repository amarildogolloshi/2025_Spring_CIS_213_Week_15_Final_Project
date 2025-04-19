import About from "../../components/public/About";
import Contact from "../../components/public/Contact";
import Hero from "../../components/public/Hero";
import PublicLayout from "../../components/public/PublicLayout";

function Home() {
    return (
        <PublicLayout>
            <Hero />
            <About />
            <Contact />
        </PublicLayout>
    );
}

export default Home;
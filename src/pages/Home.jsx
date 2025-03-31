const Home = () => {
    return (
        <div className="page page-home">
            <h1>Home</h1>
            <section id="hero">
                <div className="hero-content">
                    <h2>Welcome to Pulse</h2>
                </div>
            </section>
            <section className="about" id="about">
                <h2>About Us</h2>
                <p>We are a team of passionate developers.</p>
            </section>
            <section className="contact" id="contact">
                <h2>Contact Us</h2>
                <p>If you have any questions, feel free to reach out.</p>   
            </section>
        </div>
    )
    
}

export default Home;
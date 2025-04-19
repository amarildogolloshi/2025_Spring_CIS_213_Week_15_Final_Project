import { Link } from "react-router-dom";
import styles from './NotFound.module.css'
import PublicLayout from "../../components/public/PublicLayout";


const NotFound = () => {
    return (
        <PublicLayout>
            <section id="not-found" className={styles["not-found"]}>
                <h1>404</h1>
                <h2>Oops! Page not found.</h2>
                <p>We're sorry, but the page you're looking for doesn't exist.</p>
                <Link to="/">Go back to Home</Link>       
            </section>
        </PublicLayout>
    )
    
}

export default NotFound;
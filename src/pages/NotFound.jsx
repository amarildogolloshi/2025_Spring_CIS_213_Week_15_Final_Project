import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="page page-not-found">
            <h1>404</h1>
            <h2>Oops! Page not found.</h2>
            <p>We're sorry, but the page you're looking for doesn't exist.</p>
            <Link to="/">Go back to Home</Link>       
        </div>
    )
    
}

export default NotFound;
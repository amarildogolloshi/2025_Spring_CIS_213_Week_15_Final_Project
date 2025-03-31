import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Logo = () => {
    return(
        <div className="logo">
             <div className="pulse-image">
             <img src={logo} alt="Pulse Logo" />
             </div>
             <div className="pulse-text">
            <Link to="/">Pulse</Link>
            </div>
            
        </div>
    )
}

export default Logo;
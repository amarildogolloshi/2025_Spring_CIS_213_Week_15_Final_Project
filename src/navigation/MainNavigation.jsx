import { NavLink } from "react-router";

function MainNavigation() {
    const pageLinks = [
        {to: "#", },
    ]

    return (
        <nav>
            <li>
                <a href="#">Home</a>
            </li>
            <li>
                <a href="#about">About</a>
            </li>
            <li>
                <a href="#contact">Contact</a>
            </li>
            <li>
                <NavLink to={"/signin"}>
                    Sign In
                </NavLink>
            </li>
        </nav>
    );
}

export default MainNavigation;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const Navigation = ({children}) => {
    const location = useLocation();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop;
            window.scrollTo({
                top: offsetTop - 160, // 10rem = 160px (assuming 1rem = 16px)
                behavior: 'smooth'
            });
        }
    };

  // Handle navigation when on home page
  const handleClick = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      // If not on home page, navigate to home page first
      window.location.href = `/${sectionId}`;
    }
  };
  return (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="#about" onClick={(e) => handleClick(e, 'about')} >About</Link>
            </li>
            <li>
                <Link to="#contact" onClick={(e) => handleClick(e, 'contact')} >Contact</Link>
            </li>
            <li className='cta'>
                <Link to="#/dashboard">Go to Dashboard</Link>
            </li>
        </ul>
    </nav>
  )

}

export default Navigation;
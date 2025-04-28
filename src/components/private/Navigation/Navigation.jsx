import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa"; 
import styles from "./Navigation.module.css";

const dropdownItems = [
  {
    title: "Events",
    stateKey: "events",
    links: [
      { name: "Create New", path: "/pulse/events/create" },
      { name: "Show All", path: "/pulse/events" },
    ],
  },
  {
    title: "Members",
    stateKey: "members",
    links: [
      { name: "Create New", path: "/pulse/members/create" },
      { name: "Show All", path: "/pulse/members" },
      { name: "Cards", path: "/pulse/members/cards" },
    ],
  },
  {
    title: "Support",
    stateKey: "support",
    links: [
      { name: "Report a Problem", path: "/pulse/support/report" },
      { name: "Feature Request", path: "/pulse/support/feature" },
    ],
  }
];

function Navigation() {
  const [openDropdown, setOpenDropdown] = useState("");

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? "" : key); // Toggles active dropdown
  };

  return (
    <nav className={styles.sidebar}>
      <ul>
        <li><NavLink to="/pulse/dashboard">Dashboard</NavLink></li>

        {/* Dynamically Render Dropdowns */}
        {dropdownItems.map(({ title, stateKey, links }) => (
          <li key={stateKey}>
            <button onClick={() => toggleDropdown(stateKey)} className={styles.dropdownButton}>
              {title} {openDropdown === stateKey ? <FaAngleUp /> : <FaAngleDown />}
            </button>
            {openDropdown === stateKey && (
              <ul className={styles.dropdownMenu}>
                {links.map(({ name, path }) => (
                  <li key={path}><NavLink to={path}>{name}</NavLink></li>
                ))}
              </ul>
            )}
          </li>
        ))}

        {/* Static About Link */}
        <li><NavLink to="/pulse/about">About</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;

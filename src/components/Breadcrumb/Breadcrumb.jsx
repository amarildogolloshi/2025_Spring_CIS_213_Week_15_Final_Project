import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(segment => segment && segment.toLowerCase() !== "pulse"); // Removes empty entries

  return (
    <nav className={styles.breadcrumb}>
      <ul>
        <li><Link to="/">Home</Link></li>
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          return (
            <li key={index}>
              <Link to={path}>{segment.replace("-", " ")}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;

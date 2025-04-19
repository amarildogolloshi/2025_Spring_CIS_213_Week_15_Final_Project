import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfileDropdown.module.css"; // Ensure styles are applied
import { FaUserCircle } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import UserContext from "../../store/UserContextProvider";


const UserProfileDropdown = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {user, logout, dispatch} = useContext(UserContext);

  const handleSignoff = () => {
    // Clear authentication state (if using localStorage or context)
    logout()
    dispatch({ type: "LOGOUT" });
    navigate("/signin"); // Redirect to sign-in page after logout
  };

  return (
    <div className={styles.profileContainer}>
      <button className={styles.profileButton} onClick={() => setIsOpen(!isOpen)}>
      <FaUserCircle size={24} className={styles.icon} />
        {user?.username || "Guest"}
      </button>
      
      {isOpen && (
        <div className={styles.dropdownMenu}>
          
          <button className={styles.logoutButton} onClick={handleSignoff}>
          <FaSignOutAlt size={20} />
            Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;

import { NavLink } from "react-router-dom";
import styles from "./SideNav.module.css";
import { NavLinkProps } from "./NavLinkProps";
import AvatarImage from "../../assets/images/avatar.png";
const MyNavLink = () => {
  return (
    <ul>
      {NavLinkProps.map((item, index) => {
        return (
          <li key={index}>
            <NavLink
              className={({ isActive }) => {
                return isActive ? styles.active : "";
              }}
              to={item.path}
            >
              <div className="flex space-x-4">
                <span>{item.icon}</span>
                <span className={styles.item}>{item.label}</span>
              </div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

function Sidebar() {
  return (
    <div className="bg-slate-500 text-slate-100 w-60 min-h-screen shadow-lg">
      <div className={styles.sidebar + " shadow-lg rounded-sm"}>
        <div className={styles.profile}>
          <img src={AvatarImage} alt="profile_picture" />
          <h3>Sidhesh Kallyankar</h3>
          <p>Product Owner</p>
        </div>
        <MyNavLink />
      </div>
    </div>
  );
}

export default Sidebar;

import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideNav.module.css";
import { NavLinkProps, ToggleClose, ToggleOpen } from "./NavLinkProps";
import AvatarImage from "../../assets/images/avatar.png";
import { useAuthContext } from "../../context/AuthContext";

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
  const [toggleNav, setToggleNav] = useState(false);
  const auth = useAuthContext();
  const { user } = auth;
  return (
    <div
      className={`bg-white text-white min-h-screen shadow-lg ${
        toggleNav ? "w-6" : "w-60"
      }`}
    >
      <div
        className={`${styles.sidebar} shadow-lg rounded-sm ${
          toggleNav ? "w-6" : "w-60"
        }`}
      >
        <button
          className="flex justify-end translate-x-2 w-full  text-slate-200"
          onClick={(e) => setToggleNav((prev) => !prev)}
        >
          <div className="bg-[#054468] rounded-full  text-white">
            {toggleNav ? <ToggleOpen /> : <ToggleClose />}
          </div>
        </button>
        {!toggleNav && (
          <>
            <div className={styles.profile}>
              <img src={AvatarImage} alt="profile_picture" />
              <h3>{user.name + " " + user.last_name}</h3>
              <p>Product Owner</p>
            </div>
            <MyNavLink />
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;

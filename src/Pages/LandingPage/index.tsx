import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { KalyankarLogo } from "../../assets/images";
const LandingPageHeader = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles["header__logo-box"]}>
          <img
            src={KalyankarLogo}
            alt="Logo"
            className={`${styles["header__logo"]} animate-pulse`}
          />
        </div>

        <div className={styles["header__text-box"]}>
          <h1 className={styles["heading-primary"]}>
            <span className={styles["heading-primary--main"]}>Kalyankar's</span>
            <span className={styles["heading-primary--sub"]}>
              is where life happens
            </span>
          </h1>

          <Link
            to="/admin-login"
            className={`${styles.btn} ${styles["btn--white"]} ${styles["btn--animated"]}`}
          >
            Admin Login
          </Link>
        </div>
      </header>
    </div>
  );
};

export default LandingPageHeader;

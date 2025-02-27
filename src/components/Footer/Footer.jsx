import s from "./Footer.module.scss";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className={s.footerStyling}>
      <div className={s.leftContainer}>
        <div className={s.logoContainer}>
          <h2>Homelands</h2>
        </div>
        <div className={s.contactContainer}>
          <span>
            <p>Øster Uttrupvej 5</p>
            <p>9000 Aalborg</p>
          </span>
          <span>
            <p>Email: info@homelands.dk</p>
            <p>Telefon: +45 1122 3344</p>
          </span>
        </div>
      </div>
      <div className={s.mediaContainer}>
        <FaTwitterSquare />
        <FaFacebookSquare />
      </div>
    </footer>
  );
};

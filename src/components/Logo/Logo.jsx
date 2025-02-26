import { NavLink } from "react-router-dom";
import s from "./Logo.module.scss";

export const Logo = () => {
  return (
    <div className={s.logoStyling}>
      <NavLink to="/">
        <h1>Homelands</h1>
      </NavLink>
    </div>
  );
};

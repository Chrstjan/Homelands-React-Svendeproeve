import s from "./Nav.module.scss";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";

export const Nav = ({ isNavHidden }) => {
  const { user } = useContext(UserContext);

  const paths = [
    {
      id: 1,
      name: "Forside",
      path: "/",
    },
    {
      id: 2,
      name: "Boliger til salg",
      path: "/estates",
    },
    {
      id: 3,
      name: `${user?.access_token ? "Logout" : "Login"}`,
      path: "/login",
    },
  ];
  return (
    <nav>
      <ul
        className={`${s.navStyling} ${
          isNavHidden ? s.hiddenStyling : s.navStyling
        }`}
      >
        {paths?.map((item) => {
          return (
            <li key={item?.id}>
                  <NavLink className={({isActive}) => isActive ? s.activeLink : ''} to={item?.path}>{item?.name}</NavLink>
                </li>
          );
        })}
      </ul>
    </nav>
  );
};

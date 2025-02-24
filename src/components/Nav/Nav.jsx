import s from "./Nav.module.scss"
import { paths } from "../../router/paths.js";
import { NavLink } from "react-router-dom";

export const Nav = ({isNavHidden}) => {
  return (
    <nav>
        <ul className={`${s.navStyling} ${
          isNavHidden ? s.hiddenStyling : s.navStyling
        }`}>
            {paths.map((item) => {
                return (
                    <>
                        {item?.name ? <li key={item.id}>
                        <NavLink to={item.path}>{item.name}</NavLink>
                    </li> : null}
                    </>
                )
            })}
        </ul>
    </nav>
  )
}
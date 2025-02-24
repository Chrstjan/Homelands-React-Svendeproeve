import s from "./Searchbar.module.scss"
import { CiSearch } from "react-icons/ci";

export const Searchbar = ({isNavHidden}) => {
  return (
    <div className={`${s.searchStyling} ${isNavHidden ? s.hiddenStyling : s.searchStyling}`}>
        <input type="text" placeholder="Indtast søgeord"/>
        <span>
            <CiSearch />
        </span>
    </div>
  )
}
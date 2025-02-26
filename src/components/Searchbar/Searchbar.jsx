import { useState } from "react";
import s from "./Searchbar.module.scss";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";

export const Searchbar = ({ isNavHidden }) => {
  const [searchedWord, setSearchedWord] = useState("");
  return (
    <div
      className={`${s.searchStyling} ${
        isNavHidden ? s.hiddenStyling : s.searchStyling
      }`}
    >
      <input
        onChange={(e) => setSearchedWord(e.target.value)}
        type="text"
        placeholder="Indtast søgeord"
        value={searchedWord}
      />
      <NavLink to={`/search/${searchedWord}`}>
        <span>
          <CiSearch />
        </span>
      </NavLink>
    </div>
  );
};

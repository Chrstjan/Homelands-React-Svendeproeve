import s from "./BurgerMenu.module.scss";

export const BurgerMenu = ({ setIsNavHidden }) => {
  return (
    <div
      onClick={() => setIsNavHidden((prev) => !prev)}
      className={s.burgerStyling}
    >
      <span className={s.barStyling}></span>
      <span className={s.barStyling}></span>
      <span className={s.barStyling}></span>
    </div>
  );
};
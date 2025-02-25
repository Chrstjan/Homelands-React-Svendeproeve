import s from "./EstatePrice.module.scss";

export const EstatePrice = ({ setEstatePrice }) => {
  return (
    <div>
      <p>Sorter efter prisniveau</p>
      <div className={s.dotsContainer}>
        <span
          onClick={() => setEstatePrice("low")}
          className={s.lowPrice}
        ></span>
        <span className={s.line}></span>
        <span
          onClick={() => setEstatePrice("high")}
          className={s.highPrice}
        ></span>
      </div>
    </div>
  );
};

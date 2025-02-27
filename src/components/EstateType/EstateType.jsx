import s from "./EstateType.module.scss";

export const EstateType = ({ setSelectedType }) => {
  return (
    <select
      className={s.selectStyling}
      onChange={(e) => setSelectedType(e.target.value)}
    >
      <option defaultValue disabled>
        Sorter efter type
      </option>
      <option value="Villa">Villa</option>
      <option value="Villalejlighed">Villalejlighed</option>
      <option value="Ejerlejlighed">Ejerlejlighed</option>
    </select>
  );
};

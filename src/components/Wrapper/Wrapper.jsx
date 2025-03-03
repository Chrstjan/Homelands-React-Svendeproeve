import s from "./Wrapper.module.scss";

export const Wrapper = ({ children, type, text, subText }) => {
  return (
    <>
      <header>
        {text ? <h2>{text}</h2> : null}
        {subText ? <p>{subText}</p> : null}
      </header>
      <section className={`${s.wrapperStyling} ${s[type]}`}>{children}</section>
    </>
  );
};

import s from "./Wrapper.module.scss";

export const Wrapper = ({ children, type, text, subText }) => {
  return (
    <section className={`${s.wrapperStyling} ${s[type]}`}>
      {text ? <h2>{text}</h2> : null}
      {subText ? <p>{subText}</p> : null}
      {children}
    </section>
  );
};

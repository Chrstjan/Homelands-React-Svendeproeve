import s from "./Location.module.scss";

export const Location = () => {
  return (
    <>
      <iframe
        className={s.locationStyling}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2170.208802607784!2d9.964551177406426!3d57.04796537359099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464932b69856edb3%3A0xe12d94d82c0b02c7!2sTECHCOLLEGE!5e0!3m2!1sda!2sdk!4v1740558657658!5m2!1sda!2sdk"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
};

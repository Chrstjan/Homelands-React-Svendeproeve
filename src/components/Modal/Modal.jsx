import { Gallery } from "../Gallery/Gallery";
import { Location } from "../Location/Location";
import s from "./Modal.module.scss";

export const Modal = ({ isModalOpen, setIsModalOpen, modalContent }) => {
  return (
    <>
      <div
        onClick={() => setIsModalOpen((prev) => !prev)}
        className={`${isModalOpen ? s.overlayStyling : s.hiddenStyling}`}
      ></div>
      <div className={`${isModalOpen ? s.modalStyling : s.hiddenStyling}`}>
        <button onClick={() => setIsModalOpen((prev) => !prev)}>X</button>
        {modalContent &&
        !Array.isArray(modalContent) &&
        modalContent.startsWith(
          "https://api.mediehuset.net/images/homelands/plans/"
        ) ? (
          <img src={modalContent} alt="Floorplan" />
        ) : modalContent &&
          !Array.isArray(modalContent) &&
          modalContent.startsWith("location") ? (
          <Location />
        ) : modalContent && Array.isArray(modalContent) ? (
          <Gallery data={modalContent} />
        ) : null}
      </div>
    </>
  );
};

import { useState } from "react";
import s from "./Gallery.module.scss";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

export const Gallery = ({ data }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);

  const nextSlide = () => {
    if (galleryIndex === data?.length - 1) {
      setGalleryIndex(0);
    } else {
      setGalleryIndex(galleryIndex + 1);
    }
  };

  const prevSlide = () => {
    if (galleryIndex === 0) {
      setGalleryIndex(data.length - 1);
    } else {
      setGalleryIndex(galleryIndex - 1);
    }
  };

  return (
    <>
      <div className={s.arrowContainer}>
        <FaRegArrowAltCircleLeft onClick={() => prevSlide()} />
        <FaRegArrowAltCircleRight onClick={() => nextSlide()} />
      </div>
      <img src={data[galleryIndex]?.filename?.medium} />
    </>
  );
};

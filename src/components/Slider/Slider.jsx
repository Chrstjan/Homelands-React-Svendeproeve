import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/UseFetch";
import s from "./Slider.module.scss";

export const Slider = () => {
  const { data, isLoading, error } = useFetch(
    "https://api.mediehuset.net/homelands/images"
  );
  const [images, setImages] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    let imagesArray = data?.items?.slice(-3);
    let selectedImages = imagesArray?.flatMap((item) => {
      return item.image;
    });
    let images = selectedImages?.slice(2, 5);
    console.log(images);
    setImages(images);
  }, [data]);

  const nextSlide = () => {
    // console.log("next");
    if (sliderIndex === images?.length - 1) {
      setSliderIndex(0);
    } else {
      setSliderIndex(sliderIndex + 1);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      nextSlide();
    }, 3500);
    return () => {
      clearTimeout(timer);
    };
  }, [sliderIndex]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error getting images, try again</h2>;
  }

  return (
    <div className={s.sliderStyling}>
      {images && images?.length > 0 ? <img src={images[sliderIndex]} /> : null}
    </div>
  );
};

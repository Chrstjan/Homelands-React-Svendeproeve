import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import s from "./EstateCard.module.scss";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const EstateCard = ({ data, type, canLike }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/estates/${id}`);
  };

  return (
    <>
      {data?.map((item) => {
        return (
          <figure
            onClick={() => handleCardClick(item?.id)}
            key={item?.id}
            className={`${s.cardStyling} ${s[type]}`}
          >
            <header>
              <img src={item?.images[0]?.filename?.medium} alt={item?.adress} />
              <span className={s.headerInfo}>
                <h4>{item?.address}</h4>
                {user && canLike ? (
                  <span className={s.likeContainer}>
                    <FaRegHeart />
                  </span>
                ) : null}
                <p>
                  {item?.zipcode}
                  <span>{item?.city}</span>
                </p>
                <p>{item?.type}</p>
              </span>
            </header>
            <figcaption>
              <span className={`${s.energyType} ${s[item?.energy_label_name]}`}>
                <p>{item?.energy_label_name}</p>
              </span>
              <span className={s.infoContainer}>
                <p>{item?.num_rooms} værelser,</p>
                <p>
                  {item?.floor_space} m <sup>2</sup>
                </p>
              </span>
              <p>{item?.price} DKK</p>
            </figcaption>
          </figure>
        );
      })}
    </>
  );
};

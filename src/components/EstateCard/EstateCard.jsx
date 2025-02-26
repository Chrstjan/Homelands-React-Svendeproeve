import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import s from "./EstateCard.module.scss";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Toastbar } from "../Toastbar/Toastbar";

export const EstateCard = ({ data, type, canLike, canDislike }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const notify = () => toast("Bolig liket");
  const [estates, setEstates] = useState();

  useEffect(() => {
    setEstates(data);
  }, [data]);

  const handleCardClick = (id) => {
    navigate(`/estates/${id}`);
  };

  const handleLikeEstate = async (id) => {
    const body = new URLSearchParams();
    body.append("home_id", id);

    const res = await fetch("https://api.mediehuset.net/homelands/favorites", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
      body: body,
    });

    const likeData = await res.json();

    if (likeData?.status == "Ok") {
      notify();
    }
  };

  const handleDislikeEstate = async (id) => {
    const res = await fetch(
      `https://api.mediehuset.net/homelands/favorites/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      }
    );
    const dislikeData = await res.json();
    console.log(dislikeData);
    if (dislikeData?.message == "Record deleted") {
      let allEstates = [...estates];
      let filteredEstates = allEstates.filter((item) => item?.home_id !== id);
      setEstates(filteredEstates);
    }
  };

  return (
    <>
      {estates?.map((item) => {
        return (
          <figure
            onClick={() => {
              !canDislike ? handleCardClick(item?.id) : null;
            }}
            key={item?.id || item?.home_id}
            className={`${s.cardStyling} ${s[type]}`}
          >
            <header>
              <img src={item?.images[0]?.filename?.medium} alt={item?.adress} />
              <span className={s.headerInfo}>
                <h4>{item?.address}</h4>
                {user && canLike ? (
                  <span className={s.likeContainer}>
                    <FaRegHeart onClick={() => handleLikeEstate(item?.id)} />
                  </span>
                ) : null}
                {user && canDislike ? (
                  <span className={s.likeContainer}>
                    <FaRegHeart
                      onClick={() => handleDislikeEstate(item?.home_id)}
                    />
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
      <Toastbar />
    </>
  );
};

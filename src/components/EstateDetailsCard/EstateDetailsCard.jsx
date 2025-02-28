import s from "./EstateDetailsCard.module.scss";
import { FaCamera } from "react-icons/fa";
import { RiBuilding3Line } from "react-icons/ri";
import { ImLocation2 } from "react-icons/im";
import { FaRegHeart } from "react-icons/fa";
import { Modal } from "../Modal/Modal";
import { toast } from "react-toastify";
import { Toastbar } from "../Toastbar/Toastbar";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { cleanDescriptionText } from "../../helpers/cleanDescription";
import { formatPrice } from "../../helpers/formatPrice";

export const EstateDetailsCard = ({ data }) => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  console.log(data);

  const handleGallery = () => {
    setIsModalOpen((prev) => !prev);
    console.log(data?.images);
    setModalContent(data?.images);
  };

  const handlefloorplan = () => {
    setIsModalOpen((prev) => !prev);
    let floorplan = data?.floorplan.slice(51, 200);
    setModalContent(floorplan);
  };
  const handleLocation = () => {
    setIsModalOpen((prev) => !prev);
    setModalContent("location");
  };

  const notify = (success) => {
    if (success) {
      toast("Bolig tilføjet til favoritter");
    } else {
      toast("Du skal være logget ind for at kunne tilføje til favoritter");
    }
  };

  const handleLikeClick = async (id) => {
    const body = new URLSearchParams();
    body.append("home_id", id);

    const res = await fetch("https://api.mediehuset.net/homelands/favorites", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
      body: body,
    });

    if(!res.status=="500") {
      notify(false);
      console.log("error");
      
    }

    const likeData = await res.json();

    if (likeData?.status == "Ok") {
      notify(true);
    }
  };

  return (
    <>
      <figure className={s.cardStyling}>
        <header>
          <span className={s.addressContainer}>
            <h2>{data?.address}</h2>
            <p>
              {data?.zipcode} {data?.city}
            </p>
            <p>
              {data?.type} | {data?.ground_space} m<sup>2</sup> |{" "}
              {data?.num_rooms} vær
            </p>
            <p>Set {data?.num_clicks} gange</p>
          </span>
          <span className={s.iconContainer}>
            <FaCamera onClick={() => handleGallery()} />
            <RiBuilding3Line onClick={() => handlefloorplan()} />
            <ImLocation2 onClick={() => handleLocation()} />
            <FaRegHeart onClick={() => handleLikeClick(data?.id)} />
          </span>
          <span className={s.priceContainer}>
            <span className={s.priceStyling}>
              <h4>Kontantpris</h4>
              <h2>{formatPrice(data?.price)}</h2>
            </span>
            <p>Udbetaling {formatPrice(data?.payout)}</p>
            <p>Ejerudgift per måned {formatPrice(data?.gross)}</p>
          </span>
        </header>
        <figcaption>
          <div className={s.infoContainer}>
            <div className={s.leftContainer}>
              <span className={s.infoBar}>
                <p>Sagsnr.</p>
                <p>{data?.id}</p>
              </span>
              <span className={s.infoBar}>
                <p>Boligareal</p>
                <p>
                  {data?.floor_space} m<sup>2</sup>
                </p>
              </span>
              <span className={s.infoBar}>
                <p>Grundareal</p>
                <p>
                  {data?.ground_space} m<sup>2</sup>
                </p>
              </span>
              <span className={s.infoBar}>
                <p>Antal rum</p>
                <p>{data?.num_rooms}</p>
              </span>
              <span className={s.infoBar}>
                <p>Antal plan</p>
                <p>{data?.num_floors}</p>
              </span>
              <span className={s.infoBar}>
                <p></p>
                <p></p>
              </span>
            </div>
            <div className={s.middleContainer}>
              <span className={s.infoBar}>
                <p>Kælder</p>
                <p>
                  {data?.basement_space} m<sup>2</sup>
                </p>
              </span>
              <span className={s.infoBar}>
                <p>Byggeår</p>
                <p>{data?.year_construction}</p>
              </span>
              <span className={s.infoBar}>
                <p>Ombygget</p>
                <p>{data?.year_rebuilt}</p>
              </span>
              <span className={s.infoBar}>
                <p>Energimærke</p>
                <p>{data?.energy_label_name}</p>
              </span>
              <span className={s.infoBar}>
                <p>Liggetid</p>
                <p>{data?.date_friendly}</p>
              </span>
            </div>
            <div className={s.rightContainer}>
              <span className={s.infoBar}>
                <p>Kontantpris</p>
                <p>{formatPrice(data?.price)}</p>
              </span>
              <span className={s.infoBar}>
                <p>Udbetaling</p>
                <p>{formatPrice(data?.payout)}</p>
              </span>
              <span className={s.infoBar}>
                <p>Brutto ex. ejerudgift</p>
                <p>{formatPrice(data?.gross)}</p>
              </span>
              <span className={s.infoBar}>
                <p>Ejerudgift</p>
                <p>{formatPrice(data?.gross)}</p>
              </span>
            </div>
          </div>
          <div className={s.bottomContainer}>
          <div className={s.descriptionContainer}>
            <p>{cleanDescriptionText(data?.description).slice(0, 500)}</p>
            <p>{cleanDescriptionText(data?.description).slice(500, 1500)}</p>
          </div>
          <div className={s.contactContainer}>
            <h2>Kontakt</h2>
            <figure>
              <img src={data?.staff?.image} alt={data?.staff?.firstname} />
              <figcaption>
                <h4>
                  {data?.staff?.firstname} {data?.staff?.lastname}
                </h4>
                <p>{data?.staff?.position}</p>
                <p>Mobil: {data?.staff?.phone}</p>
                <p>Email: {data?.staff?.email}</p>
              </figcaption>
            </figure>
          </div>
          </div>
        </figcaption>
      </figure>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalContent={modalContent}
      />
      <Toastbar />
    </>
  );
};

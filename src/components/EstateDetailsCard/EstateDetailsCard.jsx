import s from "./EstateDetailsCard.module.scss";
import { FaCamera } from "react-icons/fa";
import { RiBuilding3Line } from "react-icons/ri";
import { ImLocation2 } from "react-icons/im";
import { FaRegHeart } from "react-icons/fa";

export const EstateDetailsCard = ({ data }) => {
  return (
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
          <FaCamera />
          <RiBuilding3Line />
          <ImLocation2 />
          <FaRegHeart />
        </span>
        <span className={s.priceContainer}>
          <span className={s.priceStyling}>
            <h4>Kontantpris</h4>
            <h2>{data?.price}</h2>
          </span>
          <p>Udbetaling {data?.payout}</p>
          <p>Ejerudgift per måned {data?.gross}</p>
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
              <p>{data?.price}</p>
            </span>
            <span className={s.infoBar}>
              <p>Udbetaling</p>
              <p>{data?.payout}</p>
            </span>
            <span className={s.infoBar}>
              <p>Brutto ex. ejerudgift</p>
              <p>{data?.gross}</p>
            </span>
            <span className={s.infoBar}>
              <p>Ejerudgift</p>
              <p>{data?.cost}</p>
            </span>
          </div>
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
      </figcaption>
    </figure>
  );
};

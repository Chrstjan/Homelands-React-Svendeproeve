import s from "./EstateCard.module.scss";

export const EstateCard = ({ data, type }) => {
  return (
    <>
      {data?.map((item) => {
        return (
          <figure key={item?.id} className={`${s.cardStyling} ${s[type]}`}>
            <header>
              <img src={item?.images[0]?.filename?.medium} alt={item?.adress} />
              <span className={s.headerInfo}>
                <h4>{item?.address}</h4>
                <p>
                  {item?.zipcode}
                  <span>{item?.city}</span>
                </p>
                <p>{item?.type}</p>
              </span>
            </header>
            <figcaption>
              <span className={s.energyType}>
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

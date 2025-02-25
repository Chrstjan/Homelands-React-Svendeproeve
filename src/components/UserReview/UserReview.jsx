import { formatDay } from "../../helpers/formatDay";
import s from "./UserReview.module.scss";

export const UserReview = ({ data }) => {
  const handleRemoveReivew = async (id) => {};
  return (
    <div className={s.reviewsContainer}>
      <span className={s.reviewBar}>
        <h4>Dine anmeldelser</h4>
        <h4>Dato</h4>
        <h4>Handling</h4>
      </span>
      {data?.map((item) => {
        return (
          <span className={s.reviewBar}>
            <p>{item?.title.slice(0, 12)}...</p>
            <p>{formatDay(item?.created_friendly)}</p>
            <p onClick={() => handleRemoveReivew(item?.id)}>Slet</p>
          </span>
        );
      })}
    </div>
  );
};

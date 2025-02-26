import { useContext, useEffect, useState } from "react";
import { formatDay } from "../../helpers/formatDay";
import s from "./UserReview.module.scss";
import { UserContext } from "../../context/UserContext";
import { useFetch } from "../../hooks/UseFetch";
import { toast } from "react-toastify";
import { Toastbar } from "../Toastbar/Toastbar";

export const UserReview = () => {
  const { data, isLoading, error } = useFetch(
    "https://api.mediehuset.net/homelands/reviews"
  );
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState();

  useEffect(() => {
    if (data) {
      setReviews(data?.items);
    }
  }, [data]);

  const notify = () => toast("Anmeldelse slettet");

  const handleRemoveReivew = async (id) => {
    const res = await fetch(
      `https://api.mediehuset.net/homelands/reviews/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      }
    );

    const deletedData = await res.json();
    console.log(deletedData);

    if (deletedData.message == "Record deleted") {
      let allReviews = [...reviews];
      let filteredReviews = allReviews.filter((item) => item?.id !== id);
      setReviews(filteredReviews);
      notify();
    }
  };

  return (
    <div className={s.reviewsContainer}>
      <span className={s.reviewBar}>
        <h4>Dine anmeldelser</h4>
        <h4>Dato</h4>
        <h4>Handling</h4>
      </span>
      {reviews?.map((item) => {
        return (
          <span key={item?.id} className={s.reviewBar}>
            <p>{item?.title.slice(0, 12)}...</p>
            <p>{formatDay(item?.created_friendly)}</p>
            <p onClick={() => handleRemoveReivew(item?.id)}>Slet</p>
          </span>
        );
      })}
      <Toastbar />
    </div>
  );
};

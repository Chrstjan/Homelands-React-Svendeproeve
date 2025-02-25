import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/UseFetch";
import { UserContext } from "../../context/UserContext";
import s from "./ReviewCard.module.scss";

export const ReviewCard = ({ setWriteReview }) => {
  const { data, isLoading, error } = useFetch(
    "https://api.mediehuset.net/homelands/reviews"
  );
  console.log(data?.items);
  const [review, setReview] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (data) {
      const randomReview =
        data?.items[Math.floor(Math.random() * data?.items?.length)];
      console.log(randomReview);
      setReview(randomReview);
    }
  }, [data]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error getting review, try again</h2>;
  }

  return (
    <>
      <div className={s.reviewStyling}>
        <h2>{review?.title}</h2>
        <p>{review?.content}</p>
        <span>
          <p>{review?.user?.firstname + " " + review?.user?.lastname}</p>
          <p>{review?.created_friendly}</p>
        </span>
      </div>
      {user?.access_token ? (
        <p onClick={() => setWriteReview((prev) => !prev)}>
          Skriv en anmeldelse
        </p>
      ) : null}
    </>
  );
};

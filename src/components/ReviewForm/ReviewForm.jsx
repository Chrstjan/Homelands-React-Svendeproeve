import { useForm } from "react-hook-form";
import s from "./ReviewForm.module.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { Toastbar } from "../Toastbar/Toastbar";

export const ReviewForm = ({ setWriteReview }) => {
  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const notify = () => toast("Anmeldelse oprettet");

  const handleFormSubmit = async (data) => {
    const { title, content } = { ...data };

    const body = new URLSearchParams();
    body.append("title", title);
    body.append("content", content);
    body.append("user_id", user.user_id);
    body.append("active", true);
    body.append("num_stars", 5);

    const res = await fetch("https://api.mediehuset.net/homelands/reviews", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
      body: body,
    });

    const test = await res.json();
    console.log(test);

    if (test?.status == "Ok") {
      notify();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={s.formStyling}>
        <span className={s.inputContainer}>
          <label htmlFor="title">Title:</label>
          <input
            {...register("title", {
              required: "title is required",
              pattern: {
                message: "Invalid title format",
              },
              minLength: {
                value: 5,
                message: "title must be at least 5 characters",
              },
            })}
            type="text"
            id="title"
            name="title"
          />
        </span>
        <span className={s.inputContainer}>
          <label htmlFor="content">Anmeldelse:</label>
          <textarea
            {...register("content", {
              required: "content is required",
              pattern: {
                message: "content title format",
              },
              minLength: {
                value: 5,
                message: "content must be at least 5 characters",
              },
            })}
            id="content"
            name="content"
          />
        </span>
        <input type="submit" value="Send" />
      </form>
      <p onClick={() => setWriteReview((prev) => !prev)}>Skriv en anmeldelse</p>
      <Toastbar />
    </>
  );
};

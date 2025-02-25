import { useForm } from "react-hook-form";
import s from "./ReviewForm.module.scss"
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const ReviewForm = ({setWriteReview}) => {
    const { user } = useContext(UserContext);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "all",
      });

      const handleFormSubmit = async (data) => {
          const { title, content } = { ...data };

          const formData = {
            title: title,
            content: content,
            user_id: user.user_id,
            active: true,
            num_stars: 1 //temp
          };

          const res = await fetch(`https://api.mediehuset.net/homelands/reviews`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.access_token}`
            },
            body: JSON.stringify(formData),
          });

          const test = await res.json();
          console.log(test);
          
      }

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
        <label htmlFor="review">Anmeldelse:</label>
        <textarea
              {...register("review", {
                required: "review is required",
                pattern: {
                  message: "review title format",
                },
                minLength: {
                  value: 5,
                  message: "review must be at least 5 characters",
                },
              })}
              id="review"
              name="review"
            />
        </span>
        <input type="submit" value="Send"/>
        </form>
    <p onClick={() => setWriteReview((prev) => !prev)}>Skriv en anmeldelse</p>
    </>
  )
}
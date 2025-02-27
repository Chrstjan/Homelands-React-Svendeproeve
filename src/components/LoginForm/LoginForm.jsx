import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import s from "./LoginForm.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Toastbar } from "../Toastbar/Toastbar";

export const LoginForm = () => {
  const { user, loginUser, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const notify = (success) => {
    if (success) {
      toast("Du er logget ind!");
    } else {
      toast("Bruger ikke fundet, forket username eller password");
    }
  };

  const handleFormSubmit = async (data) => {
    const { username, password } = { ...data };

    const formData = {
      username: username,
      password: password,
    };

    const res = await fetch(`https://api.mediehuset.net/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const userData = await res.json();

    if (userData) {
      loginUser(userData);
      notify(true);
    }
    else {
      notify(false);
    }
  };

  return (
    <>
      <header className={s.formHeader}>
        <h2>{!user?.access_token ? "Login" : "Du er logget ind"}</h2>
        <p>
          {!user?.access_token
            ? "Indtast dit brugernavn og adgangskode for at logge ind"
            : "Du kan navigere til dit dashboard herunder"}
        </p>
      </header>
      {!user?.access_token ? (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className={s.formStyling}
        >
          <input
            {...register("username", {
              required: "username is required",
              pattern: {
                message: "Invalid username format",
              },
              minLength: {
                value: 5,
                message: "username must be at least 5 characters",
              },
            })}
            type="email"
            id="username"
            name="username"
            placeholder="Brugernavn"
          />
          {errors.email ? <span>{errors.username.message}</span> : null}
          <input
            {...register("password", {
              required: "password is required",
              pattern: {
                message: "Invalid password format",
              },
              minLength: {
                value: 5,
                message: "password must be at least 5 characters",
              },
            })}
            type="password"
            id="password"
            name="password"
            placeholder="Adgangskode"
          />
          {errors.email ? <span>{errors.password.message}</span> : null}
          <span className={s.buttonContainer}>
            <input type="submit" value="Login" />
            <input type="reset" value="Annuller" />
          </span>
        </form>
      ) : (
        <span className={s.accountStyling}>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <button onClick={() => logoutUser()}>Log ud</button>
        </span>
      )}
      <Toastbar />
    </>
  );
};

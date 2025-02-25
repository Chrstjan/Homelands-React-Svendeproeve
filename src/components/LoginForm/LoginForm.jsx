import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { useForm } from "react-hook-form";
import s from "./LoginForm.module.scss"

export const LoginForm = () => {
   const {user, loginUser} = useContext(UserContext);

   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const handleFormSubmit = async (data) => {
    console.log(data);
    const { username, password } = { ...data };

    const formData = {
      username: username,
      password: password,
    };

    console.log(formData);

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
      console.log("Login", userData);
      
    }
  };

  return (
    <>
        <header className={s.formHeader}>
            <h2>Login</h2>
            <p>Indtast dit brugernavn og adgangskode for at logge ind</p>
        </header>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={s.formStyling}>
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
              type="text"
              id="username"
              name="username"
              placeholder="Brugernavn"
            />
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
            <span className={s.buttonContainer}>
                <input type="submit" value="Login"/>
                <input type="reset" value="Annuller"/>
            </span>
        </form>
    </>
  )
}
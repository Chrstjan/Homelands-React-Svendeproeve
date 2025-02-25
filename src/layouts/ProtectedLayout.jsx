import { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Logo } from "../components/Logo/Logo";
import { Nav } from "../components/Nav/Nav";
import { Searchbar } from "../components/Searchbar/Searchbar";
import { BurgerMenu } from "../components/BurgerMenu/BurgerMenu";

export const ProtectedLayout = () => {
  const { user } = useContext(UserContext);
  const [isNavHidden, setIsNavHidden] = useState(true);

  if (!user?.access_token) {
    return <Navigate to="/" redirect />;
  }

  return (
    <>
      <Header>
        <Logo />
        <Nav isNavHidden={isNavHidden} />
        <Searchbar isNavHidden={isNavHidden} />
        <BurgerMenu setIsNavHidden={setIsNavHidden} />
      </Header>
      <Outlet />
      <Footer />
    </>
  );
};

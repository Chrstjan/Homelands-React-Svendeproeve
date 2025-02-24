import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Logo } from "../components/Logo/Logo";
import { BurgerMenu } from "../components/BurgerMenu/BurgerMenu";
import { useState } from "react";
import { Nav } from "../components/Nav/Nav";
import { Searchbar } from "../components/Searchbar/Searchbar";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = () => {
  const [isNavHidden, setIsNavHidden] = useState(true);
  return (
    <>
      <Header>
        <Logo />
        <Nav isNavHidden={isNavHidden} />
        <Searchbar isNavHidden={isNavHidden} />
        <BurgerMenu setIsNavHidden={setIsNavHidden} />
      </Header>
      <Footer />
      <Outlet />
    </>
  );
};

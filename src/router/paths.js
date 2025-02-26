import { DashboardPage } from "../pages/DashboardPage";
import { EstatePage } from "../pages/EstatePage";
import { EstatesPage } from "../pages/EstatesPage";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { PageNotFound } from "../pages/PageNotFound";

export const paths = [
  {
    id: 1,
    name: "Forside",
    path: "/",
    element: LandingPage,
  },
  {
    id: 2,
    name: "Boliger til salg",
    path: "/estates",
    element: EstatesPage,
  },
  {
    id: 3,
    name: "Login",
    path: "/login",
    element: LoginPage,
  },
  {
    id: 4,
    path: "/estates/:EstateId",
    element: EstatePage,
  },
  {
    id: 5,
    path: "/search/:keyword",
    element: EstatesPage,
  },
  {
    id: 99,
    path: "/*",
    element: PageNotFound,
  },
];

export const protectedPaths = [
  {
    id: 1,
    path: "/dashboard",
    element: DashboardPage,
  },
];

import { LandingPage } from "../pages/LandingPage";
import { PageNotFound } from "../pages/PageNotFound";

export const paths = [
    {
        id: 1,
        name: "Forside",
        path: "/",
        element: LandingPage
    },
    {
        id: 99,
        path: "/*",
        element: PageNotFound
    }
]
import Home from "../pages/home";
import Favourites from "../pages/favourites";

// routes
export const pageRoutes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/favourites",
        name: "Favourites",
        component: Favourites
    }
];



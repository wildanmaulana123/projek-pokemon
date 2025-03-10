import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FC } from "react";
import axios from "axios";

import Home from "@/pages";
import Detail from "@/pages/Detail";
import MyPokemon from "@/pages/MyPokemon";

axios.defaults.baseURL = "https://pokeapi.co/api/v2/pokemon";

const Router: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/pokemon/:id",
      element: <Detail />,
    },
    {
      path: "/mypokemon",
      element: <MyPokemon />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

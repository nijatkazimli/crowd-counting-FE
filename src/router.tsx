import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import * as Pages from "./components/Pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Pages.Count />,
      },
      {
        path: "/:id",
        element: <Pages.Count />,
      },
      {
        path: "/history",
        element: <Pages.Archive />,
      },
      {
        path: "/insights",
        element: <Pages.Insights />,
      },      
      {
        path: "*",
        element: <Pages.ErrorPage />,
      },
    ],
  },
]);

export default router;

import React from "react";
import { render } from "react-dom";
import App from './components/App.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  }
]);

render(
  <RouterProvider router={router} />,
  document.getElementById("root")
);

import React from "react";
import axios from 'axios';
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

const onAuthenticated = function () {
  render(
    // <RouterProvider router={router} />,
    <App />,
    document.getElementById("root")
  );
}

const handleLogin = function () {
  const username = prompt('username');
  const password = prompt('password');
  axios({
    url: '/authenticate/login',
    method: 'post',
    data: { username, password }
  })
    .then((res) => {
      console.log(res);
      onAuthenticated(res)
    })
    .catch((err) => {
      console.log(err);
      // handleLogin();
    })
}


axios({
  url: '/authenticate',
  method: 'get'
})
  .then((res) => {
    console.log(res);
    onAuthenticated();
  })
  .catch((err) => handleLogin())

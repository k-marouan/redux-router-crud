import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// import AddPost from "./pages/AddPost";
// import EditPost from "./pages/EditPost";
// import Details from "./pages/Details";
import Index from "./pages/Index";
import RootLayout from "./pages/RootLayout";
import Error from "./pages/Error";

// code-splitting
const AddPost = React.lazy(() => import('./pages/AddPost'));
const EditPost = React.lazy(() => import('./pages/EditPost'));
const Details = React.lazy(() => import('./pages/Details'));

const postParamHandler = ({ params }) => {
  if(isNaN(params.id)) {
    throw new Response("Bad Request", {
      statusText: "ID must be a number!",
      status: 400,
    });
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Index /> },
      { path: "post", element: <Index /> },
      { 
        path: "post/add", 
        element: 
          <Suspense fallback="Loading, please wait.."> 
            <AddPost />
          </Suspense> 
        },
      { 
        path: "post/:id",
        element: 
        <Suspense fallback="Loading, please wait..">
          <Details />
        </Suspense>
        ,
        loader: postParamHandler,
      },
      { 
        path: "post/:id/edit",
        element: 
        <Suspense fallback="Loading, please wait..">
          <EditPost />
        </Suspense>
        ,
        loader: postParamHandler,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={ store }>
    <RouterProvider router={ router } />
  </Provider>
);

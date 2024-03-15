import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Authors from "./pages/Authors.jsx";
import AuthorPosts from "./pages/AuthorPosts.jsx";
import CategoryPosts from "./pages/CategoryPosts.jsx";
import Register from "./pages/Register.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditPost from "./pages/EditPost.jsx";
import DeletePost from "./pages/DeletePost.jsx";
import UserProvider from "./context/userContext.js";
import Layout from "./component/Layout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx"
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import Logout from "./pages/Logout.jsx";

const router= createBrowserRouter([
  {
    path:"/",
    element: <UserProvider><Layout/></UserProvider>,
    errorElement:<ErrorPage/>,
    children:[
      {index:true, element: <Home />},
           {path:"/login", element:<Login />},
           {path:"/PostDetail", element:<PostDetail/>},
           {path:"/CreatePost", element:<CreatePost />},
           {path:"/Authors", element:<Authors />},
           {path:"/AuthorPosts", element:<AuthorPosts />},
           {path:"/CategoryPosts", element:<CategoryPosts />},
           {path:"/Register", element:<Register />},
           {path:"/UserProfile", element:<UserProfile />},
           {path:"/Dashboard", element:<Dashboard />},
           {path:"/EditPost", element:<EditPost />},
           {path:"/DeletePost", element:<DeletePost />},
           {path:"/Logout", element:<Logout />}
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
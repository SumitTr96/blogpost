import Header from "./component/Header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Footer from "./component/Footer.jsx";
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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/PostDetail" element={<PostDetail />} />
          <Route path="/CreatePost" element={<CreatePost />} />
          <Route path="/Authors" element={<Authors />} />
          <Route path="/AuthorPosts" element={<AuthorPosts />} />
          <Route path="/CategoryPosts" element={<CategoryPosts />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/EditPost" element={<EditPost />} />
          <Route path="/DeletePost" element={<DeletePost />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

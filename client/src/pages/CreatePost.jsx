import React, { useState, useContext } from "react";
import { UserContext } from "../context/userContext";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  const createPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        console.log("Post Created successfully");
      }
      return navigate("/");
      
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const POST_CATEGORIES = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];

  return (
    <section className="create_post py-5">
      <div className="container">
        <h2 className="mb-4">Create Post</h2>
        {error && <p className="error">{error}</p>}
        <form className="create_post_form" onSubmit={createPost}>
          <div className="mb-3">
            <label className="form-label" htmlFor="formTitle">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="formTitle"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="formCategory">
              Category
            </label>
            <select
              className="form-select"
              id="formCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {POST_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="formThumbnail">
              Thumbnail
            </label>
            <div className="input-group">
              <input
                type="file"
                className="form-control"
                id="formThumbnail"
                onChange={(e) => setThumbnail(e.target.files[0])}
                accept="png,jpg,jpeg"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="formDescription">
              Description
            </label>
            <textarea
              className="form-control"
              id="formDescription"
              rows={5}
              placeholder="Enter detailed description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;

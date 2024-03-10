import React, { useState } from "react";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

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
    <section className="edit_post py-5">
      <div className="container">
        <h2 className="mb-4">Edit Post</h2>
        <div className="alert alert-danger" role="alert">
          This is an error message
        </div>
        <form className="edit_post_form">
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
            Edit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;

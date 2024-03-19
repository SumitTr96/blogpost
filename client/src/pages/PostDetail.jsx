import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Loader from "../component/Loader";
import DeletePost from "./DeletePost";
import PostAuthor from "../component/PostAuthor";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setPost(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    getPost();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="post_detail py-5">
        {error && <p className="error">{JSON.stringify(error)}</p>}
        {post && (
          <div className="container">
            <div className="col-lg-8 col-md-10 row justify-content-center card shadow-sm mx-auto">
              <div className="card-body header_author d-flex justify-content-between align-items-center mb-4">
                <PostAuthor authorId={post.creator} createdAt={post.createdAt} />
                {post && currentUser?.id === post?.creator && (
                  <div className="header_btns">
                    <Link
                      to={`/posts/${post?._id}/edit`}
                      className="btn btn-primary me-2"
                    >
                      EDIT
                    </Link>
                    <DeletePost postId={id} />
                  </div>
                )}
              </div>
              <h4 className="mb-4">{post.title}</h4>
              <div className="post_body">
                <div className="thumbnail_post">
                  <img
                    src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`}
                    alt="thumbnail"
                    className="img-fluid rounded"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default PostDetail;

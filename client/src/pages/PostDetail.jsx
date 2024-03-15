import React, { useState,useContext,useEffect } from "react";

import PostAuthor from "../component/PostAuthor";
import { Link } from "react-router-dom";
import postImage from "../component/blog95.jpg";
import "../css/postDetail.css";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
const PostDetail = () => {
  const {currentUser}=useContext(UserContext)
  const token=currentUser?.token;
  const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  return (
    <>
      <section className="post_detail py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="card shadow-sm mx-auto">
                <div className="card-body">
                  <div className="header_author d-flex justify-content-between align-items-center mb-4">
                    <PostAuthor />
                    <div className="header_btns">
                      <Link
                        to={`posts/users/editPost`}
                        className="btn btn-primary me-2"
                      >
                        EDIT
                      </Link>
                      <Link
                        to={`posts/users/deletePost`}
                        className="btn btn-danger"
                      >
                        DELETE
                      </Link>
                    </div>
                  </div>
                  <h4 className="mb-4">TITLE</h4>
                  <div className="post_body">
                    <div className="thumbnail_post">
                      <img
                        src={postImage}
                        alt="thumbnail"
                        className="img-fluid rounded"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                  </div>
                  <article className="mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nisi molestias aspernatur, eum laboriosam animi iusto
                    doloremque unde provident ipsam, dolorum sint repellat ex.
                    Ex, iure? Magnam sint minima consectetur ipsum. ipsum dolor
                    sit amet, consectetur adipisicing elit. Iusto, quam placeat.
                    Quis eveniet quod omnis assumenda quae. Error labore ab
                    blanditiis. Quia, porro nihil? Ab amet soluta vero quia
                    fugiat quas, ea maxime odio, deleniti deserunt harum
                    excepturi placeat voluptatum quos molestias aliquid
                    repellendus, fugit doloremque reiciendis ut non quod fuga
                    consequuntur laboriosam! A quisquam illo obcaecati, eum modi
                    nesciunt facere id culpa consequuntur provident ipsa neque
                    porro, accusantium cumque autem voluptas commodi numquam
                    quas sed voluptate ab nihil. Quidem id voluptate explicabo
                    magni porro provident placeat nam debitis doloribus
                    voluptatem dicta optio unde eaque, at commodi sunt facilis
                    dignissimos necessitatibus est enim recusandae earum.
                    Dignissimos in, facere similique ullam labore, assumenda
                    alias distinctio modi, illo unde aperiam corrupti
                    consectetur accusamus officia quam totam soluta harum autem.
                    Explicabo obcaecati, excepturi non magnam porro aut iure
                    unde tempore laborum. Voluptate, rem molestiae doloremque
                    non corrupti et fugit, quidem, adipisci molestias aliquid
                    accusamus animi exercitationem? Asperiores repellat nostrum
                    magnam sapiente animi delectus dolore rerum saepe, minima
                    quia possimus voluptatem nesciunt cupiditate pariatur nihil
                    laborum. Labore, velit voluptatum? Assumenda, sapiente. Quo
                    laborum nostrum tempore, non veniam temporibus repellendus
                    sit! Impedit optio voluptate ad placeat veritatis magni,
                    alias eius iste asperiores necessitatibus architecto ullam?
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostDetail;

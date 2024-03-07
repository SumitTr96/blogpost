import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-body-tertiary text-center text-lg-start text-white"
      data-bs-theme="dark"
    >
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6">
            <p>Get connected with us on social networks:</p>
            <p>Company name</p>
          </div>
          <div className="col-lg-6">
            <p>Products</p>
            <p>Useful links</p>
          </div>
        </div>
        <div className="text-center p-3">
          <p>© 2024 Copyright: BlogPost.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

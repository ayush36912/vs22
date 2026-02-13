import React from "react";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="text-center">
        <div className="row">
          <div className="col-12">
            <h1
              className="display-1 mb-4 text-primary"
              style={{ fontSize: "8rem", fontWeight: "bold" }}
            >
              404
            </h1>
            <h2 className="h1 mb-3">Oops! Page Not Found</h2>
            <p
              className="lead mb-5 text-muted"
              style={{ maxWidth: "500px", margin: "0 auto" }}
            >
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="btn btn-primary rounded-pill px-5 py-3">
              <i className="uil uil-arrow-left me-2"></i>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

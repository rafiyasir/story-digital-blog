import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  const {
    _id,
    title,
    user: { name },
    createdAt,
  } = post;

  return (
    <Link to={`/posts/${_id}`}>
      <div className="card bg-light">
        <ul className="list">
          <li>
            <h2>
              <i className="fas fa-book-open" /> {title}{" "}
            </h2>
          </li>
          <li>
            <p>
              <i className="fas fa-pen">
                {" "}
                {name} on {createdAt}
              </i>
            </p>
          </li>
        </ul>
      </div>
    </Link>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;

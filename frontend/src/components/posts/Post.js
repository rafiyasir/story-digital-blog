import React, { Fragment, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import PostContext from "../../context/post/postContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import PostForm from "./PostForm";

const Post = () => {
  const navigate = useNavigate();
  const params = useParams();
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);
  const { user, isAuthenticated, loadUser } = authContext;
  const {
    getPost,
    post,
    deletePost,
    setCurrent,
    clearCurrent,
    current,
    loading,
  } = postContext;

  useEffect(() => {
    console.log("useeffect");
    loadUser();
    if (!isAuthenticated) {
      console.log("not authorized");
      navigate("/login");
    } else {
      getPost(params.id);
    }
    //eslint-disable-next-line
  }, [isAuthenticated, current]);

  if (!post && !loading) {
    return <h1>Loading...</h1>;
  }

  const {
    _id,
    title,
    text,
    user: { name },
    createdAt,
  } = post;
  console.log("post", title, text, name, createdAt);
  //   console.log("user", user._id);

  let ableToModify = false;

  if (user && post && post.user._id === user._id) {
    ableToModify = true;
  }
  console.log("abletomodify", ableToModify);

  const onDelete = () => {
    deletePost(_id);
    clearCurrent();
    navigate("/posts");
  };

  return (
    <Fragment>
      {current ? (
        <PostForm />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn btn-light">
            Back To Posts
          </Link>
          <div className="card bg-light">
            <h2>{title}</h2>
            <p>{text}</p>
            <span>
              Posted By {name} on {createdAt}
            </span>
            <br />
            {ableToModify && (
              <Fragment>
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => setCurrent(post)}
                >
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>
                  Delete
                </button>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Post;

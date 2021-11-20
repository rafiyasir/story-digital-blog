import React, { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
import PostContext from "../../context/post/postContext";

const Posts = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);

  const { isAuthenticated, loadUser } = authContext;
  const { posts, getPosts, loading, setForm, form } = postContext;

  useEffect(() => {
    console.log("posts useeffect");
    loadUser();
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      getPosts();
    }
    //eslint-disable-next-line
  }, [isAuthenticated, loading]);

  return (
    <Fragment>
      {form ? (
        <PostForm />
      ) : (
        <Fragment>
          <button
            className="btn btn-dark btn-sm"
            style={{ float: "right" }}
            onClick={() => {
              setForm();
            }}
          >
            Create A Post
          </button>
          {posts !== null && posts.length === 0 && !loading ? (
            <h4>Please write some Posts</h4>
          ) : posts !== null && !loading ? (
            <div className="gird-1">
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <Spinner />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Posts;

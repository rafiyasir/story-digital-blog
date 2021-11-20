import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import PostContext from "../../context/post/postContext";

const PostForm = () => {
  const navigate = useNavigate();
  const postContext = useContext(PostContext);

  const { addPost, updatePost, clearCurrent, current, closeForm, form } =
    postContext;

  useEffect(() => {
    if (current !== null) {
      setPost(current);
    } else {
      setPost({
        title: "",
        text: "",
      });
    }
  }, [postContext, current]);

  const [post, setPost] = useState({
    title: "",
    text: "",
  });

  const { title, text } = post;

  const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addPost(post);
    } else {
      updatePost(post);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
    closeForm();
    if (current !== null) {
      navigate(`/posts/${current._id}`);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? "Edit Post" : "Add Post"}</h2>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={title}
        onChange={onChange}
      />
      <textarea
        name="text"
        id=""
        cols="30"
        rows="10"
        value={text}
        onChange={onChange}
      />
      <div className="">
        <input
          type="submit"
          value={current ? "Update Post" : "Add Post"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear & Close
          </button>
        </div>
      )}
      {form && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Close
          </button>
        </div>
      )}
    </form>
  );
};

export default PostForm;

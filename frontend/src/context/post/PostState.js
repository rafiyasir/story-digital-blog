import React, { useReducer } from "react";
import axios from "axios";
import PostContext from "./postContext";
import postReducer from "./postReducer";
import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_POST,
  CLEAR_POSTS,
  POST_ERROR,
  CLOSE_FORM,
  SET_FORM,
} from "../types";

const PostState = (props) => {
  const initialState = {
    posts: null,
    post: null,
    current: null,
    form: false,
    error: null,
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  // Get Posts
  const getPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      console.log("posts", res.data);

      dispatch({ type: GET_POSTS, payload: res.data });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get Single Post
  const getPost = async (id) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      console.log("post...", res.data);

      dispatch({ type: GET_POST, payload: res.data });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Add Post
  const addPost = async (post) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/posts", post, config);

      dispatch({ type: ADD_POST, payload: res.data });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Delete Post
  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);

      dispatch({ type: DELETE_POST, payload: id });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Clear
  const clearPosts = () => {
    dispatch({ type: CLEAR_POSTS });
  };

  //Set Current Post
  const setCurrent = (post) => {
    dispatch({ type: SET_CURRENT, payload: post });
  };

  //Close Form
  const closeForm = () => {
    dispatch({ type: CLOSE_FORM });
  };

  //Open Form
  const setForm = () => {
    dispatch({ type: SET_FORM });
  };

  //Clear Current Post
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Update Post
  const updatePost = async (post) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/posts/${post._id}`, post, config);

      dispatch({
        type: UPDATE_POST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
    dispatch({ type: UPDATE_POST, payload: post });
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        post: state.post,
        current: state.current,
        form: state.form,
        error: state.error,
        addPost,
        deletePost,
        setCurrent,
        setForm,
        clearCurrent,
        closeForm,
        updatePost,
        getPosts,
        getPost,
        clearPosts,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;

import React, { useState, useEffect } from "react";
import ErrorModal from "../../components/Modal/ErrorModal";
import useHttpClient from "../../hooks/useHttpClient";
import PostList from "../PostList/PostList";
import PostType from "../PostType/PostType";
const Posts = ({ cover }) => {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [postType, setPostType] = useState("post");
  const { isLoading, sendReq, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/posts/type/${postType}`
        );
        setLoadedPosts(responseData.posts);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendReq, postType]);

  function getType(type) {
    setPostType(type);
  }

  return (
    <div>
      <ErrorModal error={error} onClose={clearError} />
      <PostType getType={getType}></PostType>
      {loadedPosts && (
        <PostList isLoading={isLoading} items={loadedPosts} cover={cover} />
      )}
    </div>
  );
};

export default Posts;

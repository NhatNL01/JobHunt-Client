import React, { useState, useEffect } from "react";
import { FaArrowDown } from "@react-icons/all-files/fa/FaArrowDown";
import ErrorModal from "../../components/Modal/ErrorModal";
import useHttpClient from "../../hooks/useHttpClient";
import PostList from "../PostList/PostList";
import PostType from "../PostType/PostType";
const Posts = ({ cover }) => {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState(false);
  const pageSize = 5;

  const [postType, setPostType] = useState("post");
  const { isLoading, sendReq, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/posts/type/${postType}?page=${page}&pageSize=${pageSize}`
        );
        if (responseData.posts.length < pageSize) {
          setEndPage(true);
        }

        setLoadedPosts((prevLoadedPost) => {
          return [...prevLoadedPost, ...responseData.posts];
        });
        setLoading(false);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendReq, postType, page]);

  function getType(type) {
    if (type !== postType) {
      setPostType(type);
      setLoadedPosts([]);
      setPage(1);
      setEndPage(false);
    }
  }

  return (
    <div>
      <ErrorModal error={error} onClose={clearError} />
      <PostType getType={getType} postType={postType}></PostType>
      {loadedPosts && (
        <PostList isLoading={isLoading} items={loadedPosts} cover={cover} />
      )}
      <button
        className="post-type-item"
        style={{ margin: "10px auto", display: endPage && "none" }}
        onClick={() => setPage(page + 1)}>
        {loading ? "Loading... " : "Load More "}
        <FaArrowDown />
      </button>
      <p style={{ textAlign: "center", display: endPage ? "block" : "none" }}>
        NO RESULTS WERE FOUND
      </p>
    </div>
  );
};

export default Posts;

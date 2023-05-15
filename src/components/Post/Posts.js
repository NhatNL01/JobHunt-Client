import React, { useState, useEffect } from "react";
import { FaArrowDown } from "@react-icons/all-files/fa/FaArrowDown";
import ErrorModal from "../../components/Modal/ErrorModal";
import useHttpClient from "../../hooks/useHttpClient";
import PostList from "../PostList/PostList";
import PostType from "../PostType/PostType";
import Dropdown from "../DropDown/DropDown";
const Posts = ({ cover }) => {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState(false);
  const pageSize = 5;

  const [filter, setFilter] = useState("Latest");
  const [postType, setPostType] = useState("post");
  const { isLoading, sendReq, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/posts/type/${postType}?page=${page}&pageSize=${pageSize}&filter=${filter}`
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
  }, [sendReq, postType, page, filter]);

  function getType(type) {
    if (type !== postType) {
      setPostType(type);
      setLoadedPosts([]);
      setPage(1);
      setEndPage(false);
    }
  }

  const handleSelect = (e) => {
    setFilter(e.target.value);
    setLoadedPosts([]);
    setPage(1);
    setEndPage(false);
  };

  return (
    <div>
      <ErrorModal error={error} onClose={clearError} />
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}>
        <PostType getType={getType} postType={postType}></PostType>
        <Dropdown handleSelect={handleSelect} menu={["Latest", "Top"]} />
      </div>
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

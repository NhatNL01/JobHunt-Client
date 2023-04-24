import React from "react";
import { FaNewspaper } from "@react-icons/all-files/fa/FaNewspaper";
import { FaBriefcase } from "@react-icons/all-files/fa/FaBriefcase";
import "./PostType.css";

const PostType = ({ getType, postType }) => {
  return (
    <div className="post-type">
      <div
        className="post-type-item"
        style={
          postType === "post"
            ? { backgroundColor: "#38a7c3", color: "#fff" }
            : {}
        }
        onClick={(e) => getType("post")}>
        <FaNewspaper className="mr-10" />
        Post
      </div>
      <div
        className="post-type-item"
        style={
          postType === "job"
            ? { backgroundColor: "#38a7c3", color: "#fff" }
            : {}
        }
        onClick={(e) => getType("job")}>
        <FaBriefcase className="mr-10" />
        Job
      </div>
    </div>
  );
};

export default PostType;

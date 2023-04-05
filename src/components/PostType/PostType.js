import React from "react";
import { FaNewspaper } from "@react-icons/all-files/fa/FaNewspaper";
import { FaBriefcase } from "@react-icons/all-files/fa/FaBriefcase";
import "./PostType.css";

const PostType = ({ getType }) => {
  return (
    <div className="post-type">
      <div className="post-type-item" onClick={(e) => getType("post")}>
        <FaNewspaper className="mr-10" />
        Post
      </div>
      <div className="post-type-item" onClick={(e) => getType("job")}>
        <FaBriefcase className="mr-10" />
        Job
      </div>
    </div>
  );
};

export default PostType;

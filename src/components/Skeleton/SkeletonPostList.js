import React from "react";
import SkeletonArticle from "./SkeletonArticle";
import "./SkeletonElement.css";

const SkeletonPostList = ({ type }) => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, index) => (
        <React.Fragment key={index}>
          <SkeletonArticle firstEl={index === 0} type={type} />
        </React.Fragment>
      ))}
    </>
  );
};

export default SkeletonPostList;

import React from "react";
import CvItem from "./CvItem";
import SkeletonTags from "../../components/Skeleton/SkeletonTags";

const CvList = (props) => {
  if (!props.isLoading && props.cvs && props.cvs.length === 0) {
    return <div className="center">No cvs found!</div>;
  }

  return (
    <div className="container tags">
      {props.isLoading && <SkeletonTags />}
      {props.cvs.map((cv, index) => (
        <CvItem name={cv.name} id={cv.id} image={cv.image} key={cv.id} />
      ))}
    </div>
  );
};

export default CvList;

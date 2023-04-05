import React, { useState } from "react";
import AuthModal from "../../components/Modal/AuthModal";
import { DeleteCv } from "./DeleteCv";
import { PostImage } from "../../components/PostImage/PostImage";
import ListImage from "../../components/ListImage/ListImage";

const CvItem = ({ name, id, image, followers, clickFollowButton }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AuthModal onClose={() => setShowModal(false)} show={showModal} />
      <div className="tags__item">
        <PostImage
          // link={`/posts/${titleURL}/${id}`}
          className="img-cv-a4"
          src={image}
          alt={`Cover image for ${name}`}
        />
        <ListImage images={[image]} />

        <div className="flex-item">
          <h3 className="mr-20">{name}</h3>
          <DeleteCv cvId={id} setShowModal={setShowModal} />
        </div>
      </div>
    </>
  );
};

export default CvItem;

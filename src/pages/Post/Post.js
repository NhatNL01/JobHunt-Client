import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../hooks/useHttpClient";
import { useParams } from "react-router-dom";
import PostReactions from "../../components/Post/PostReactions/PostReactions";
import PostContent from "../../components/Post/PostContent/PostContent";
import PostAuthor from "../../components/Post/PostAuthor/PostAuthor";
import ErrorModal from "../../components/Modal/ErrorModal";
import AuthModal from "../../components/Modal/AuthModal";
import ApplyJobModal from "../../components/Modal/ApplyJobModal";
import { SkeletonPage } from "../../components/Skeleton/SkeletonPage";
import { AuthContext } from "../../context/auth";

const Post = (props) => {
  let auth = useContext(AuthContext);
  const { currentUser } = auth;
  const [post, setPost] = useState({});
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { postId, titleURL } = useParams();
  const [showModal, setShowModal] = useState(false);

  let { author } = post;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/posts/${titleURL}/${postId}`
        );
        setPost(responseData.post);
      } catch (err) {}
    };
    fetchPost();
  }, [sendReq, postId, titleURL]);

  // Handle apply job recruiter
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showApplyJobHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelApplyJobHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmApplyJobHandler = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      {isLoading && <SkeletonPage />}
      <ErrorModal error={error} onClose={clearError} />
      {!isLoading && post.author && (
        <div className="container-layout-post">
          <PostReactions post={post} setShowModal={setShowModal} />
          <AuthModal onClose={() => setShowModal(false)} show={showModal} />
          <div className="container-post">
            <PostContent post={post} />
            <div className="author flow-content">
              <PostAuthor
                setShowModal={setShowModal}
                author={author}
                isLoading={isLoading}
              />

              {currentUser.role === "recruiter" || post.type === "post" ? (
                <span></span>
              ) : (
                <>
                  <button
                    className={`btn--profile-cta btn-apply`}
                    onClick={showApplyJobHandler}>
                    + Apply This Job
                  </button>
                  <ApplyJobModal
                    jobId={postId}
                    onClose={() => setShowConfirmModal(false)}
                    show={showConfirmModal}
                    cancelApplyJobHandler={cancelApplyJobHandler}
                    confirmApplyJobHandler={confirmApplyJobHandler}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;

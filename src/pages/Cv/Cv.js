import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../hooks/useHttpClient";
import { useParams } from "react-router-dom";
// import ErrorModal from "../../components/Modal/ErrorModal";
import AddCVModal from "../../components/Modal/AddCVModal";
import CvList from "./CvList";
import { AuthContext } from "../../context/auth";
import "./Cv.css";

const Cv = () => {
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [loadedCvs, setLoadedCvs] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const {
    isLoading,
    sendReq,
    // error, clearError
  } = useHttpClient();
  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/cvs/user/${userId}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${currentUser.token}`,
          }
        );
        setLoadedCvs(responseData.cvs);
      } catch (err) {}
    };
    fetchCvs();
  }, [sendReq, userId, currentUser, isAdded]);

  // Handle add cv recruiter
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showAddCVHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelAddCVHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmAddCVHandler = () => {
    setShowConfirmModal(false);
    setIsAdded(true);
  };

  return (
    <>
      {/* <ErrorModal error={error} onClose={clearError} /> */}
      <div className="container tags">
        <AddCVModal
          onClose={() => setShowConfirmModal(false)}
          show={showConfirmModal}
          cancelAddCVHandler={cancelAddCVHandler}
          confirmAddCVHandler={confirmAddCVHandler}
        />
        <button
          className="btn btn-tag-follow btn-add-cv bg-add"
          onClick={showAddCVHandler}>
          {" "}
          + Add Your CV
        </button>
      </div>
      <CvList isLoading={isLoading} cvs={loadedCvs} />
    </>
  );
};

export default Cv;

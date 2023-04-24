import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import { useHttpClient } from "../../hooks/useHttpClient";
import PostList from "../../components/PostList/PostList";
import ErrorModal from "../../components/Modal/ErrorModal";
import RegisterAsRecruiterModal from "../../components/Modal/RegisterAsRecruiterModal";

import AuthModal from "../../components/Modal/AuthModal";
import Avatar from "../../components/Avatar/Avatar";
import { AuthContext } from "../../context/auth";
import { FaCalendarPlus } from "@react-icons/all-files/fa/FaCalendarPlus";
import { FaRegUserCircle } from "@react-icons/all-files/fa/FaRegUserCircle";
import { FaLocationArrow } from "@react-icons/all-files/fa/FaLocationArrow";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import JoinCompanyModal from "../../components/Modal/JoinCompanyModal";

const CompanyProfile = () => {
  let auth = useContext(AuthContext);
  const [company, setCompany] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { companyId } = useParams();
  const { currentUser } = auth;
  const [loadedPosts, setLoadedPosts] = useState([]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/companies/${companyId}`
        );
        setCompany(responseData.company);
        // setPosts(responseData.posts);
      } catch (err) {}
    };
    fetchCompany();
  }, [sendReq, companyId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/posts/type/job/company/${companyId}`,
          "GET"
        );
        setLoadedPosts(responseData.posts);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendReq, companyId]);

  // Handle register recruiter
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showRegisterHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelRegisterHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmRegisterHandler = () => {
    handleRegister();
  };

  const handleRegister = async () => {
    try {
      const responseData = await sendReq(
        `${process.env.REACT_APP_BASE_URL}/companies/${companyId}/add/${currentUser.userId}`,
        "PATCH",
        null,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
      const { id } = responseData.company;
      const { setUser: setAppUser } = auth;
      setAppUser({ ...currentUser, company: id });
      toast.success("Join successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(loadedPosts);
  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <AuthModal onClose={() => setShowModal(false)} show={showModal} />
      <ToastContainer />
      <div className="container-layout container-user">
        <div className="user__main">
          <Avatar src={company.avatar} isLoading={isLoading} />
          <div className="main__cta">
            <h2 style={{ fontSize: "30px" }}>{company.name}</h2>
            {/* //////// */}
            {currentUser.userId && !currentUser.company && (
              <>
                <JoinCompanyModal
                  onClose={() => setShowConfirmModal(false)}
                  show={showConfirmModal}
                  cancelRegisterHandler={cancelRegisterHandler}
                  confirmRegisterHandler={confirmRegisterHandler}
                />
                <button
                  className="btn btn--profile-cta btn--profile-edit"
                  onClick={showRegisterHandler}>
                  Join Company +
                </button>
              </>
            )}
            {/* ////////// */}
          </div>
        </div>
        <div className="user__content">
          <div className="user__side">
            <div className="user__stats">
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Infomation
              </h2>
              <ul>
                <li>
                  <div
                    className="flex preview__info-item"
                    style={{ width: "100%" }}>
                    <FaCalendarPlus />
                    {"Founded year: "}
                    {company.foundedYear}
                  </div>
                </li>
                <li>
                  <div className="flex preview__info-item">
                    <FaRegUserCircle />
                    {company.scale}
                    {" members"}
                  </div>
                </li>
                <li>
                  <div className="flex preview__info-item">
                    <FaLocationArrow />
                    {company.address}
                  </div>
                </li>
                <li>
                  <div className="flex preview__info-item">
                    <FaPhoneAlt />
                    {company.contact}
                  </div>
                </li>
              </ul>
            </div>
            <div className="user__stats">
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>About us</h2>
              <p style={{ fontSize: "18px" }}>{company.description}</p>
            </div>
          </div>
          <div className="wrapper__user--posts">
            {/* <h2
              className="text-center"
              style={{ fontSize: "20px", fontWeight: "bold", margin: "15px" }}>
              Recruitment
            </h2> */}
            <PostList cover={false} items={loadedPosts} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;

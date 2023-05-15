import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import { useHttpClient } from "../../hooks/useHttpClient";
import PostList from "../../components/PostList/PostList";
import ErrorModal from "../../components/Modal/ErrorModal";
import RegisterAsRecruiterModal from "../../components/Modal/RegisterAsRecruiterModal";

import { FollowUser } from "../../components/FollowUser/FollowUser";
import AuthModal from "../../components/Modal/AuthModal";
import Avatar from "../../components/Avatar/Avatar";
import { UserInfo } from "../../components/User/UserInfo/UserInfo";
import { UserSideBar } from "../../components/User/UserSideBar/UserSideBar";
import { AuthContext } from "../../context/auth";
import SkeletonElement from "../../components/Skeleton/SkeletonElement";
import { renderRepeatedSkeletons } from "../../utils";
import Shimmer from "../../components/Skeleton/Shimmer";

const UserProfile = () => {
  let auth = useContext(AuthContext);
  const history = useHistory();
  const [user, setUser] = useState({});
  // const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { userId } = useParams();
  const { currentUser } = auth;
  const currentUserId = currentUser && currentUser.userId;
  const { posts } = user;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/users/${userId}`
        );
        setUser(responseData.user);
        // setPosts(responseData.posts);
      } catch (err) {}
    };
    fetchUser();
  }, [sendReq, userId]);

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
        `${process.env.REACT_APP_BASE_URL}/users/${currentUser.userId}/registerRecruiter`,
        "PATCH",
        null,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
      const { role } = responseData.user;
      const { setUser: setAppUser } = auth;
      setAppUser({ ...currentUser, role });
      toast.success("Register successfully!", {
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
  const createChatRoom = async () => {
    try {
      const reqData = {
        name: `${userId}-${currentUserId}`,
        description: `Chat room of ${userId}-${currentUserId}`,
        member1: userId,
        member2: currentUserId,
      };
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/rooms`,
        "POST",
        JSON.stringify(reqData),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
      history.push("/chat");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <AuthModal onClose={() => setShowModal(false)} show={showModal} />
      <ToastContainer />
      <div className="container-layout container-user">
        <div className="user__main">
          <Avatar src={user.avatar} isLoading={isLoading} />
          <div className="main__cta">
            <h2>{user.name}</h2>
            {userId === currentUserId ? (
              <>
                {currentUser.role === "recruiter" ? (
                  <span></span>
                ) : (
                  <>
                    <RegisterAsRecruiterModal
                      onClose={() => setShowConfirmModal(false)}
                      show={showConfirmModal}
                      cancelRegisterHandler={cancelRegisterHandler}
                      confirmRegisterHandler={confirmRegisterHandler}
                    />
                    <button
                      className="btn btn--profile-cta btn--profile-edit"
                      onClick={showRegisterHandler}>
                      Register As Recruiter
                    </button>
                  </>
                )}
                <Link
                  className="btn btn--profile-cta btn--profile-edit"
                  to={`/users/${userId}/edit`}>
                  Edit Profile
                </Link>
              </>
            ) : (
              <>
                <FollowUser
                  followId={user.id}
                  followers={user.followers}
                  userToFollow={user}
                  setShowModal={setShowModal}
                />
                <button
                  className="btn btn--profile-cta btn--profile-edit"
                  onClick={createChatRoom}
                  // to={`/chat`}
                >
                  Chat
                </button>
              </>
            )}
          </div>
          {isLoading ? (
            <>
              {renderRepeatedSkeletons(<SkeletonElement type="text" />, 2)}
              <Shimmer />
            </>
          ) : (
            <UserInfo user={user} />
          )}
        </div>
        <div className="user__content">
          <UserSideBar user={user} />
          <div className="wrapper__user--posts">
            <PostList
              cover={false}
              items={posts}
              author={user}
              isLoading={Boolean(!user.avatar)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

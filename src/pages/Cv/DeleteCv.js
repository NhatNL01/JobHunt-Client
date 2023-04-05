import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import useHttpClient from "../../hooks/useHttpClient";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const DeleteCv = ({ cvId, setShowModal }) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { currentUser } = auth;
  const currentUserId = currentUser && currentUser.userId;
  const { sendReq } = useHttpClient();

  const handleDeleteCv = async () => {
    const reqData = { author: currentUserId };
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/cvs/${cvId}`,
        "Delete",
        JSON.stringify(reqData),
        {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        }
      );
      history.push(`/`);
    } catch (err) {}
  };
  return (
    <>
      <button className="btn btn-tag-follow bg-delete" onClick={handleDeleteCv}>
        Delete
      </button>
    </>
  );
};

import React, { useContext } from "react";
import { useHttpClient } from "../../hooks/useHttpClient";
import useForm from "../../hooks/useForm";
import { AuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { newPostForm, newJobPostForm } from "../../utils/formConfig";
import { appendData, renderRepeatedSkeletons } from "../../utils";
import ErrorModal from "../../components/Modal/ErrorModal";
import SkeletonElement from "../../components/Skeleton/SkeletonElement";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

const NewPost = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { currentUser } = auth;
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { renderFormInputs, renderFormValues, isFormValid } = useForm(
    currentUser.role === "recruiter" ? newJobPostForm : newPostForm
  );
  const formValues = renderFormValues();
  const formInputs = renderFormInputs();

  const postSubmitHandle = async (evt) => {
    evt.preventDefault(); //otherwise, there will be a reload
    const formData = appendData(formValues);
    formData.append("author", currentUser.userId);
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        "POST",
        formData,
        {
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />

      <div className="container-create-page">
        <form className="form form__create">
          <h2>Create a new post</h2>
          {formInputs}
          <button
            onClick={postSubmitHandle}
            className="btn"
            disabled={!isFormValid() || isLoading}>
            {isLoading && <LoadingIcon />}
            Submit <span>&rarr;</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPost;

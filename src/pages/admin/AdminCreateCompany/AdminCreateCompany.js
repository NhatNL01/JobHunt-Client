import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useHttpClient from "../../../hooks/useHttpClient";
import { newComapnyForm } from "../../../utils/formConfig";
import { appendData } from "../../../utils";
import ErrorModal from "../../../components/Modal/ErrorModal";
import LoadingIcon from "../../../components/LoadingIcon/LoadingIcon";
import useForm from "../../../hooks/useForm";
// import { useHttpClient } from "../../hooks/useHttpClient";
// import useForm from "../../hooks/useForm";
// import { AuthContext } from "../../context/auth";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { newPostForm, newJobPostForm } from "../../utils/formConfig";
// import { appendData, renderRepeatedSkeletons } from "../../utils";
// import ErrorModal from "../../components/Modal/ErrorModal";
// import SkeletonElement from "../../components/Skeleton/SkeletonElement";
// import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

const AdminCreateCompany = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { currentUser } = auth;
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { renderFormInputs, renderFormValues, isFormValid } =
    useForm(newComapnyForm);
  const formValues = renderFormValues();
  const formInputs = renderFormInputs();

  const postSubmitHandle = async (evt) => {
    evt.preventDefault(); //otherwise, there will be a reload
    const formData = appendData(formValues);
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/companies`,
        "POST",
        formData,
        {
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
      history.push("/companies");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />

      <div className="container-create-page">
        <form className="form form__create">
          <h2>Create a new company</h2>
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

export default AdminCreateCompany;

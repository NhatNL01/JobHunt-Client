import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";
import { AuthContext } from "../../context/auth";
import useForm from "../../hooks/useForm";
import { newCVForm } from "../../utils/formConfig";
import { appendData } from "../../utils";
import { useHttpClient } from "../../hooks/useHttpClient";
import ErrorModal from "../../components/Modal/ErrorModal";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

const AddCVModal = (props) => {
  const auth = useContext(AuthContext);
  const { currentUser } = auth;
  const { sendReq, error, clearError, isLoading } = useHttpClient();

  const { renderFormInputs, renderFormValues, isFormValid } =
    useForm(newCVForm);
  const formValues = renderFormValues();
  const formInputs = renderFormInputs();

  const postSubmitHandle = async (evt) => {
    evt.preventDefault(); //otherwise, there will be a reload
    const formData = appendData(formValues);
    formData.append("author", currentUser.userId);
    try {
      await sendReq(`${process.env.REACT_APP_BASE_URL}/cvs`, "POST", formData, {
        Authorization: `Bearer ${currentUser.token}`,
      });
      toast.success("Add successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //   history.push("/");
      props.confirmAddCVHandler();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <ToastContainer />
      <Modal
        title="Add your CV"
        show={props.show}
        onClose={props.onClose}
        footer={
          <>
            <form className="form form__create">
              {formInputs}
              {/* <button
              onClick={props.cancelAddCVHandler}
              className="btn btn--cancel">
              Cancel
            </button> */}
              <button
                onClick={postSubmitHandle}
                disabled={!isFormValid() || isLoading}
                className="btn btn--yes"
                style={
                  !isFormValid()
                    ? { backgroundColor: "#ccc", cursor: "default" }
                    : {}
                }>
                {isLoading && <LoadingIcon />}
                Add <span>&rarr;</span>
              </button>
            </form>
          </>
        }></Modal>
    </>
  );
};

export default AddCVModal;

import React from "react";

import Modal from "./Modal";

const RegisterAsRecruiterModal = (props) => {
  return (
    <Modal
      title="Do you want to register as recruiter?"
      show={props.show}
      onClose={props.onClose}
      footer={
        <>
          <button
            onClick={props.cancelRegisterHandler}
            className="btn btn--cancel">
            Cancel
          </button>
          <button
            onClick={props.confirmRegisterHandler}
            className="btn btn--yes">
            Register
          </button>
        </>
      }>
      <p>
        Are you sure to register as recruiter? Please note that this action
        can't be undone!
      </p>
    </Modal>
  );
};

export default RegisterAsRecruiterModal;

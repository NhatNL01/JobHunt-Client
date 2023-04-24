import React from "react";

import Modal from "./Modal";

const JoinCompanyModal = (props) => {
  return (
    <Modal
      title="Do you want to join this company?"
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
            Join now +
          </button>
        </>
      }>
      <p>
        Are you sure to join this company? Please note that this action can't be
        undone!
      </p>
    </Modal>
  );
};

export default JoinCompanyModal;

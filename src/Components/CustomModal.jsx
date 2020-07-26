import React, { useState } from "react";
import { Modal, ModalBody, FormGroup } from "reactstrap";

const CustomModal = (props) => {
  const [value, setValue] = useState(props.modalInfo.value);
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        className={props.className}
        centered
      >
        <div className="custom-modal-header">{props.modalInfo.modalTitle}</div>
        <ModalBody>
          <FormGroup tag="fieldset">
            {props.modalInfo.options.map((option) => {
              return (
                <div
                  style={{
                    padding: "2% 2%",
                    margin: "2% 0%",
                    backgroundColor: "#eff3ff",
                    border: "1px solid #eff3ff",
                    borderRadius: "10px",
                  }}
                  onClick={() => setValue(option.value)}
                >
                  <label className="mb-0">
                    <input
                      type="radio"
                      name={props.modalInfo.inputName}
                      value={option.value}
                      checked={value === option.value}
                    />
                    <span className="pl-2">{option.label}</span>
                  </label>
                </div>
              );
            })}
          </FormGroup>
        </ModalBody>
        <div>
          <hr className="m-0" />
          <div className="d-flex justify-content-around mt-3 mb-3">
            <button className="cancel-button" onClick={props.toggle}>
              Cancel
            </button>
            <button
              className="ok-button"
              onClick={() => props.saveValue(props.modalInfo, value)}
            >
              OK
            </button>{" "}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;

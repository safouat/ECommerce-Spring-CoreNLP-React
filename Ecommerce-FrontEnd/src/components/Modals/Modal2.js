import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Modal from "./Modal";
import Modal4 from "./Modal4";

function Card({ icon, text, showModal }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`card mb-3 w-75 m-auto ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={showModal}
    >
      <div className="card-body">
        <div className="row">
          <div className="col">
            <h5 className="card-title" style={{ fontSize: "90px" }}>
              <img src={icon} style={{ height: "159px", width: "269px" }}></img>
            </h5>
          </div>
          <div className="col m-auto">
            <p className="fs-5 m-auto texto">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal2({ partName, closeModal, makeOpenAIRequest }) {
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThreeModal, setShowThreeModal] = useState(false);
  const [modalOne, setmodalOne] = useState(true);

  const showModalHandler = () => {
    setmodalOne(false);
    setShowSecondModal(true);
  };

  const InternalOrganHandler = () => {
    setmodalOne(false);
    setShowThreeModal(true);
    setShowSecondModal(false);
  };

  return (
    <div>
      {modalOne && (
        <div
          className="modal fade show m-auto "
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {partName}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row d-flex">
                  <Card
                    icon="./media/internal.png"
                    text="Vital System"
                    showModal={showModalHandler}
                  />
                </div>

                <div className="row d-flex">
                  <Card
                    icon="./media/skin12.png"
                    text="Skin Systems"
                    showModal={InternalOrganHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSecondModal && (
        <Modal
          partName={partName}
          closeModal={closeModal}
          makeOpenAIRequest={makeOpenAIRequest}
          type="1"
        />
      )}
      {showThreeModal && <Modal4 partName={partName} closeModal={closeModal} />}
    </div>
  );
}

export default Modal2;

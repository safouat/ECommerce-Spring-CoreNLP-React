import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandDots, faBone, faBrain } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Modal4 from "./Modal4";
import Modal2 from "./Modal2";

function Card({ icon, text, showModal, img }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`card mb-3 w-75 m-auto ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={showModal}
    >
      <div className="card-body" style={{ height: "270px" }}>
        <div className="row">
          <div className="col m-auto">
            <img src={img} style={{ height: "219px" }}></img>
            <p className="fs-5 m-auto texto">{text} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal5({ partName, closeModal, makeOpenAIRequest }) {
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
                <div className="row">
                  <div className="col-13">
                    <Card
                      text="Before Consultation"
                      showModal={showModalHandler}
                      img="./media/medical12.png"
                    />
                  </div>

                  <div className="col-13">
                    <Card
                      text="After Consultation"
                      showModal={InternalOrganHandler}
                      img="./media/medical13.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSecondModal && (
        <Modal2
          partName={partName}
          closeModal={closeModal}
          makeOpenAIRequest={makeOpenAIRequest}
        />
      )}
      {showThreeModal && (
        <Modal partName={partName} closeModal={closeModal} type="0" />
      )}
    </div>
  );
}

export default Modal5;

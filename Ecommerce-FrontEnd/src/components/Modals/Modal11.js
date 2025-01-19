import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Modal11({ closeModal, Data }) {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (Data) {
      setDataLoaded(true);
    }
  }, [Data]);

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Assistance Information
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body modal-xl">
            {dataLoaded ? (
              <div dangerouslySetInnerHTML={{ __html: Data }}></div>
            ) : (
              <p>We Process Your Request...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

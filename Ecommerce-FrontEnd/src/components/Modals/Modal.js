import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "quill/dist/quill.core.css";
import QuillScript from "quill/dist/quill.js";
import "quill/dist/quill.snow.css";
import Modal11 from "./Modal11";

function Modal({ partName, closeModal, makeOpenAIRequest, SecondModal, type }) {
  const refRich = useRef(null);
  const refSymptomps = useRef(null);
  const refModal = useRef(null);
  const [Symptomps, setSymptomps] = useState("");
  const [Modal1, setModal1] = useState(false);
  const [modalOne, setmodalOne] = useState(true);

  const [MakeRequest, setMakeRequest] = useState(false);
  const [Data, setData] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (refRich.current) {
      var quill = new QuillScript(refRich.current, {
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            ["image", "code-block"],
          ],
        },
        placeholder: "Compose an epic...",
        theme: "snow",
      });

      quill.on("text-change", () => {
        const text = refSymptomps.current;
        text.value = quill.root.innerHTML;
        setSymptomps(text.value);
      });
    }
  }, []);

  return (
    <div>
      {modalOne && (
        <div>
          <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            useRef={refModal}
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
                  <div
                    name="symptomps"
                    id="descriptioninput"
                    type="hidden"
                    ref={refSymptomps}
                  ></div>

                  <div
                    className="quill-editor"
                    ref={refRich}
                    style={{ height: "266px" }}
                  ></div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn ok32"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      if (type === "1") {
                        const requestBody = {
                          body: partName,
                          symptomps: Symptomps,
                        };
                        console.log(requestBody);

                        if (!MakeRequest) {
                          fetch(
                            "//ec2-16-171-7-236.eu-north-1.compute.amazonaws.com:8080/TextGen",
                            {
                              method: "POST",
                              headers: {
                                "content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify(requestBody),
                            }
                          )
                            .then((response) => response.json())
                            .then((data) => {
                              console.log(data);
                              setData(data);
                              setmodalOne(false);

                              setModal1(true);
                            })
                            .catch((error) => {
                              console.error(
                                "Error making request to the OpenAI API:",
                                error
                              );
                            });
                        }
                        setmodalOne(false);

                        setModal1(true);
                      }
                      if (type === "0") {
                        const requestBody = {
                          body: partName,
                          symptomps: Symptomps,
                          type: type,
                        };
                        console.log(requestBody.type);

                        if (!MakeRequest) {
                          fetch(
                            "//ec2-16-171-7-236.eu-north-1.compute.amazonaws.com:8080/AfterText",
                            {
                              method: "POST",
                              headers: {
                                "content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify(requestBody),
                            }
                          )
                            .then((response) => response.json())
                            .then((data) => {
                              setData(data);
                              setmodalOne(false);
                              setModal1(true);
                            })
                            .catch((error) => {
                              console.error(
                                "Error making request to the OpenAI API:",
                                error
                              );
                            });
                        }
                        setmodalOne(false);

                        setModal1(true);
                      }
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {Modal1 && (
        <Modal11 partName={partName} closeModal={closeModal} Data={Data} />
      )}
    </div>
  );
}

export default Modal;

import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Modal4({ partName, closeModal }) {
  const refFile = useRef(null);
  const [picture, setPicture] = useState();
  const [Modal1, setModal1] = useState(false);
  const [Modal111, setModal111] = useState(true);
  const [MakeRequest, setMakeRequest] = useState(false);
  const [Data, setData] = useState();
  const [Loader, setLoader] = useState(false);
  const partName1 = partName.replaceAll("_", " ");
  const [fileS, setfileS] = useState(false);
  useEffect(() => {
    if (fileS) {
      const file = refFile.current.files[0];
      if (file) {
        var reader = new FileReader();

        reader.onload = function (event) {
          const image = new Image();

          // Access the result of the reading
          var dataURL = event.target.result;
          setData(dataURL);
          console.log(dataURL);

          // Adjust the width as needed

          // You can use 'dataURL' here or pass it to another function
        };

        reader.readAsDataURL(file);
      }
    }
  }, [fileS]);

  return (
    <div>
      {Modal111 && (
        <div>
          <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {partName1}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="container">
                    <label class="custum-file-upload" for="image">
                      <div class="icon" id="imagePreview">
                        {picture && (
                          <img
                            src={picture}
                            alt="Uploaded Image"
                            className="image123"
                          />
                        )}
                        {!picture && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill=""
                            viewBox="0 0 24 24"
                          >
                            <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                            <g
                              stroke-linejoin="round"
                              stroke-linecap="round"
                              id="SVGRepo_tracerCarrier"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                fill=""
                                d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                style={{ height: "200px !important" }}
                              ></path>
                            </g>
                          </svg>
                        )}
                      </div>

                      <input
                        name="image"
                        type="file"
                        className="form-control"
                        id="image"
                        placeholder="Image"
                        accept="image/*"
                        onChange={(e) => {
                          refFile.current = e.target;
                          console.log(refFile.current);
                          setPicture(URL.createObjectURL(e.target.files[0])); // Use createObjectURL to set the picture
                          setfileS(true);
                        }}
                        ref={refFile} // Use "ref" instead of "useRef"
                      ></input>

                      {/* Add alt attribute for accessibility */}
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn ok32 "
                    data-bs-dismiss="modal"
                    onClick={() => {
                      const requestBody = {
                        file: Data,
                        body: partName,
                      };

                      if (!MakeRequest) {
                        fetch(
                          "//ec2-16-171-7-236.eu-north-1.compute.amazonaws.com:8080/Vision",
                          {
                            method: "POST",
                            headers: {
                              "content-type": "application/json",
                            },
                            body: JSON.stringify(requestBody),
                          }
                        )
                          .then((response) => response.text())
                          .then((data) => {
                            // Clean up unwanted characters
                            console.log(data);
                            // Parse the cleaned data as JSON
                            const formattedText = data.replace(/\\n/g, "<br>");
                            const data1 = formattedText.replace(/\\/g, "");
                            const data2 = data1.replace(/\"/g, "");

                            // Use the parsed and cleaned data
                            setData(data2);
                            setModal1(true);
                            setLoader(false);
                          })
                          .catch((error) => {
                            console.error(
                              "Error making request to the OpenAI API:",
                              error
                            );
                          });
                        setLoader(true);
                        setModal111(false);
                        setModal1(false);
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
                  Your Consultation is here
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>

              <div
                className="modal-body"
                dangerouslySetInnerHTML={{ __html: Data }}
              ></div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {Loader && (
        <div className="container">
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
                    Your Consultation is here
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body d-flex justify-content-center align-items-center h-100">
                  <div className="spinner "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Modal4;

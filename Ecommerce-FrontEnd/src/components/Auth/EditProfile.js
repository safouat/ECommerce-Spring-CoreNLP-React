import React, { useRef, useState, useEffect } from "react"; // Added useEffect import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "quill/dist/quill.core.css";
import Quill from "quill/dist/quill.js";
import "quill/dist/quill.snow.css";
import {
  faCamera,
  faLightbulb,
  faPen,
  faAngleRight,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../comps/header";
import { useNavigate } from "react-router-dom";
export default function Edit() {
  const refBlog = useRef(null);
  const refRich = useRef(null);
  const refPic = useRef(null);
  const [picture, setPicture] = useState();
  const [hover, setHover] = useState(false);
  const [Data, setData] = useState();
  const [Blog, setBlog] = useState(null);
  const [action, setAction] = useState("");
  const refFile = useRef(null);
  const refTitle = useRef(null);
  const refContent = useRef(null);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (refRich.current) {
      var quill = new Quill(refRich.current, {
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
        const text = refContent.current;
        text.value = quill.root.innerHTML;
        setBlog(text.value);
      });
    }
  }, []);
  const onHandleSubmit = (action) => {
    if (refFile.current && refTitle.current && refContent.current) {
      const formData = new FormData();
      formData.append("image", refFile.current.files[0]);
      formData.append("action", "CreateBlog");
      formData.append("title", refTitle.current.value);
      formData.append("description", Blog);

      sendFile(formData);
      navigate("/HeaderProfile?page=1");
    }
  };
  const token = localStorage.getItem("token");
  const sendFile = (FormData) => {
    fetch("//ec2-16-171-7-236.eu-north-1.compute.amazonaws.com:8080/Profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: FormData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="container " style={{ marginTop: "30px" }}>
        <div class="app-form-cnt container h-100 d-flex flex-column justify-content-center">
          <div
            className="container d-flex justify-content-center"
            style={{ marginTop: "35px", marginBottom: "35px" }}
          >
            <div className="logo-container">
              <img
                src="./media/medical.png"
                alt="https://static.thenounproject.com/png/586504-200.png"
                class="transparent grand"
              />
            </div>
          </div>
          <div class="mb-3 ok198">
            <input
              name=" title"
              type="text"
              class="form-control control-lg form-control form-control-lg inp "
              id="title"
              ref={refTitle}
              placeholder="Title"
            />
          </div>
          <div class="mb-3 ok123">
            <div
              name="symptomps"
              id="descriptioninput"
              type="hidden"
              ref={refContent}
            ></div>

            <div
              className="quill-editor  m-auto"
              ref={refRich}
              style={{ height: "266px", maxWidth: "1000px" }}
            ></div>
          </div>

          <div class="mb-3 ok1287">
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
                class="form-control"
                id="image"
                placeholder="Image"
                ref={refFile}
                accept="image/*"
                onChange={(e) => {
                  refFile.current = e.target;
                  console.log(refFile.current);
                  setPicture(URL.createObjectURL(e.target.files[0])); // Use createObjectURL to set the picture
                  setfileS(true);
                }}
              />
            </label>
          </div>

          <div class="d-flex justify-content-center">
            <button
              class="btn-box theme-btn"
              type="submit"
              onClick={() => {
                setAction("CreateBlog");
                onHandleSubmit(action);
              }}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

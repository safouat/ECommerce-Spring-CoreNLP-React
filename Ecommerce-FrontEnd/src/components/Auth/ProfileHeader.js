import React, { useRef, useState, useEffect } from "react"; // Added useEffect import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "quill/dist/quill.core.css";
import Quill from "quill/dist/quill.js";
import "quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import {
  faCamera,
  faLightbulb,
  faPen,
  faAngleRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"; // Corrected import statement
import Header from "../comps/header";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function HeaderProfile(props) {
  const refBlog = useRef(null);
  const refRich = useRef(null);
  const refPic = useRef(null);
  const [hover, setHover] = useState(false);
  const [Blog, setBlog] = useState("");
  const [Blogs, setBlogs] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [Action, setAction] = useState("");
  const [pages, setPages] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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
        const text = refBlog.current;
        text.value = quill.root.innerHTML;
        setBlog(text.value);
      });
    }
  }, []);
  useEffect(() => {
    const formData1 = new FormData();
    formData1.append("page", 1);

    const queryString = new URLSearchParams(
      new URL(window.location.href).search
    ).get("page");

    const sendFile = (FormData) => {
      fetch(
        "http:/ec2-16-171-7-236.eu-north-1.compute.amazonaws.com:8080/Profile",
        {
          method: "POST",
          body: FormData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    const token = localStorage.getItem("token");

    fetch(`//ec2-16-171-7-236.eu-north-1.compute.amazonaws.com:8080/ShowUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setName(data.username);
        setEmail(data.email);
        setImage(data.imagePath);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch(
      `//ec2-16-171-7-236.eu-north-1.compute.amazonaws.com:8080/Profile?page=${queryString}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Créez ici le contenu à afficher avec les données retournées
        console.log(data);
        const data2 = JSON.parse(data.blogs);
        console.log(data2);
        console.log(data.currentPage);
        console.log(data.totalPages);
        const items = data2.map((item) => (
          <div
            className="col-lg-4 col-md-6 col-sm-12 news-block container"
            style={{ width: "350px" }}
          >
            <div
              className="news-block-one wow fadeInUp animated animated"
              data-wow-delay="00ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-box">
                <figure className="image-box blog-image">
                  <img
                    src={
                      "//ec2-16-171-7-236.eu-north-1.compute.amazonaws.com:8080/Image?fileName=/" +
                      item.picturePath
                    }
                    alt="Blog Image"
                    className="BLOGImage ok"
                    style={{
                      position: "relative",
                      objectFit: "cover !important",

                      height: "217px",
                    }}
                  ></img>
                </figure>
                <div className="lower-content o1234">
                  <h3>
                    <a href="blog-details.html">{item.title}</a>
                  </h3>

                  <div className="btn-box">
                    <Link to={`/Blog?id=` + item.id} className="btn btn-danger">
                      See Details
                    </Link>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ marginLeft: "3px", cursor: "pointer" }}
                      onClick={() => {
                        setAction("deleteBlogs");

                        const formData = new FormData();

                        formData.append("action", "deleteBlogs");
                        formData.append(
                          "user",
                          JSON.parse(sessionStorage.getItem("user"))
                        );

                        formData.append("blogId", item.id);
                        sendFile(formData);
                        window.location.reload();
                      }}
                    ></FontAwesomeIcon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ));
        const pagesArray = [];
        for (let page = 1; page <= data.totalPages; page++) {
          pagesArray.push(
            <li key={page}>
              <Link
                to={`/HeaderProfile?page=${page}`}
                className={page === data.currentPage ? "active" : ""}
              >
                {page}
              </Link>
            </li>
          );
        }
        setPages(pagesArray);

        setBlogs(items);

        // Ceci est juste pour montrer les éléments créés
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [email, image, name]); // Added an empty dependency array to run useEffect only once

  return (
    <div>
      <Header />
      <div
        style={{ height: "454px", backgroundColor: "rgb(239 239 239)" }}
        className="curve"
      >
        <div style={{ backgroundColor: "black" }}>
          <div className="" style={{ maxHeight: "404px" }}>
            <div className="content__inner">
              <div className="ms-3">
                <FontAwesomeIcon icon={faCamera} className="ok2" />
              </div>

              <div className="picture">
                {image && (
                  <img
                    src={
                      "//ec2-16-171-7-236.eu-north-1.compute.amazonaws.com:8080/Image?fileName=/" +
                      image
                    }
                    alt=""
                    className=""
                    style={{
                      width: "224px",
                      maxHeight: "223.5px",
                      objectFit: "cover",
                    }}
                  />
                )}

                {!image && (
                  <img
                    src="./media/avatar.jpg"
                    alt=""
                    className=""
                    style={{
                      width: "224px",
                      maxHeight: "223.5px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="TextInfo d-flex">
          <button
            type="button"
            className="btn btn-dark white12 "
            style={{
              width: "163px",
              backgroundColor: "none !important",
            }}
            onClick={() => {
              navigate("/ManageProfile");
            }}
          >
            Edit Profile
          </button>
          <button
            type="button"
            className="btn btn-dark okadjr"
            style={{
              width: "163px",
              backgroundColor: "#e8e8e8 !important",
            }}
            onClick={() => {
              navigate("/EditProfile");
            }}
          >
            Create Blog
          </button>
        </div>
        <div className="TextInfo1 d-flex">
          <div className="container d-flex justify-content-center h-100vh">
            {name}
          </div>
        </div>
      </div>

      <div className="auto-container">
        <div className="row clearfix">{Blogs}</div>
      </div>
      <div className="pagination-wrapper centred">
        <ul className="pagination justify-content-center">{pages}</ul>
      </div>
    </div>
  );
}

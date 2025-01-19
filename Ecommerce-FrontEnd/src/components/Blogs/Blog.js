import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Header from "../comps/header";
import Footer from "../comps/Footer";

export default function Blog() {
  const [product, setProduct] = useState(null);
  const [commentCards, setCommentCards] = useState([]);
  const refComment = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const link = "http://localhost:8009/product/" + id;

  useEffect(() => {
    fetch(link, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);

        // Generate comment cards
        const comments = data.comment || [];
        const cards = comments.map((comment) => (
          <div className="comments-area" key={comment.id}>
            <div className="comment-box">
              <div className="comment">
                <div className="comment-inner">
                  <div className="info">
                    <div className="deleteUser d-flex justify-content-between align-items-center">
                      <h4>{comment.username}</h4>
                      <div>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{
                            color: "red !important",
                            width: "30px",
                            height: "20px",
                            borderRadius: "10px",
                            height: "30px",
                          }}
                          onClick={() => {
                            const link1 = `//ec2-16-171-7-236.eu-north-1.compute.amazonaws.com:8080/DeleteComment?commentId=${comment.id}`;

                            fetch(link1, {
                              method: "POST",
                            });
                            window.location.reload();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <p>{comment.content}</p>
                </div>
              </div>
            </div>
          </div>
        ));
        setCommentCards(cards);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [location.search]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <section className="sidebar-page-container blog-details">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="blog-details-content">
                <div className="news-block-one">
                  <div className="inner-box">
                    <div className="lower-content o1">
                      <h2>{product.productName}</h2>
                      <ul className="post-info clearfix">
                        <li>Manufacturer: {product.manufacturer}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="text">
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Category: {product.category}</p>
                  <p>Status: {product.status}</p>
                </div>
                <div className="comment">
                  <div className="group-title">
                    <h3>Comments</h3>
                  </div>
                  {commentCards}
                </div>

                <div className="comments-form-area">
                  <div className="group-title">
                    <h3>Leave a Comment</h3>
                  </div>
                  <form
                    method="post"
                    action="comment"
                    id="contact-form"
                    className="default-form"
                  >
                    <div className="row clearfix">
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <input
                          name="product_id"
                          type="hidden"
                          value={product.productId}
                        />
                        <textarea
                          name="content"
                          placeholder="Leave A Comment"
                          ref={refComment}
                        ></textarea>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                        <button
                          type="button"
                          className="btn btn-dark"
                          data-bs-toggle="modal"
                          data-bs-target="#partInfoModal1"
                        >
                          Submit Now
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

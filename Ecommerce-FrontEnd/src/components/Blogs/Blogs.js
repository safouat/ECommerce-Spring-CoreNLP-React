import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Link } from "react-router-dom";
import Header from "../comps/header";
import Footer from "../comps/Footer";

export default function Blogs() {
  const [blogCard, setBlogCard] = useState("");

  useEffect(() => {
    fetch("http://localhost:8009/products", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const products = data; // Assuming `data.products` holds the JSON list
        const cards = products.map((product) => (
          <div
            className="col-lg-4 col-md-6 col-sm-12 news-block container"
            style={{ width: "350px" }}
            key={product.productId}
          >
            <div
              className="news-block-one wow fadeInUp animated animated"
              data-wow-delay="00ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-box">
                <div className="lower-content">
                  <h3>
                    <Link to={`/Blog?id=${product.productId}`}>
                      {product.productName}
                    </Link>
                  </h3>
                  <ul className="post-info clearfix">
                    <li>Price: ${product.price}</li>
                    <li>Manufacturer: {product.manufacturer}</li>
                    <li>Category: {product.category}</li>
                  </ul>
                  <p>{product.description}</p>
                  <div className="btn-bx">
                    <Link
                      to={`/Blog?id=${product.productId}`}
                      className="btn btn-danger"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ));
        setBlogCard(cards);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <Header />
      <section className="news-section blog-grid p-0">
        <div className="auto-container">
          <div className="row clearfix">{blogCard}</div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

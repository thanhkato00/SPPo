import React, { useState } from "react";
import "./product.css";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
function CurrencyDisplay({ value, currency = "JPY" }) {
  const formattedValue = value.toLocaleString("ja-JP");
  return (
    <span>
      {formattedValue} {currency}
    </span>
  );
}
function Product({
  state,
  addToCart,
  paginate,
  itemsPerPage,
  totalItems,
  currentPage,
  pageNumber,
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ images: [] });

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <section className="card-container .row-cols-3 ">
        {state.map((product) => (
          <div className="card " style={{ width: "18rem" }} key={product.id}>
            <div className="card-header ">
              <img
                src={product.images[0]}
                className="card-img-top"
                alt="..."
                onClick={() => handleOpenModal(product)}
              />
            </div>
            <div className="card-body">
              <h6>{product.category}</h6>
              <h4 className="card-title">{product.company}</h4>
              <p className="card-text">
                <span>Color :{product.color}</span>
                <br />
                <span>Style :{product.style}</span>
              </p>
            </div>
            <div className="card-footer">
              <span className="card-price">
                Price: <CurrencyDisplay value={product.price}></CurrencyDisplay>
              </span>
            </div>
            <Button variant="success" onClick={() => addToCart(product)}>
              Buy
            </Button>{" "}
          </div>
        ))}
      </section>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>More Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {selectedProduct.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Slide ${index}`}
                  style={{ width: "100%", height: "80%" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <h3>{selectedProduct.company}</h3>
          <p>
            Color: {selectedProduct.color} <br />
            Style: {selectedProduct.style}
          </p>
          <span>
            Price: <CurrencyDisplay value={selectedProduct.price} />
          </span>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Product;

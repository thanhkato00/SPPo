import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate } from "react-router-dom";

function Search({ cartItems, cartItemsList, removeFromCart }) {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);
  // Bên trong component Search của bạn
  const [showCartTable, setShowCartTable] = useState(false);

  const handleIconHover = () => {
    setShowCartTable(true);
  };

  const handleIconLeave = () => {
    setShowCartTable(false);
  };

  // Ngoài hàm Search

  useEffect(() => {
    setCartItemCount(cartItemsList.length);
  }, [cartItems]);
  const handleIconClick = () => {
    if (user) {
      console.log("ddax truyen nhwng san pham nafy vao", cartItemsList);
      navigate("/cart", { state: { cartItemsList } });
    } else {
      alert("ログインしてください");
    }
  };

  const renderTooltip = (props) => {
    // ...
    const productQuantities = {};
    const lastFiveAddedItems = cartItems.slice(0, 5); // Chỉnh sửa tên biến
    // Hàm này thực hiện việc kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const isProductInCart = (productName) => {
      return productQuantities[productName] > 0; // Sửa thành > 0
    };
    const totalQuantity = cartItemsList.length;
    return (
      //phần hiển thị sản phẩm hiện có
      <Tooltip id="button-tooltip" {...props} className="custom-tooltip">
        <div
          style={{ backgroundColor: "white", width: "437px", color: "black" }}
        >
          <h2>買い物かご</h2>
          {lastFiveAddedItems.length === 0 ? (
            <p>買い物かごは空です</p>
          ) : (
            <ul style={{ listStyleType: "none", padding: "1rem" }}>
              {lastFiveAddedItems.map((item, index) => (
                <li key={index}>
                  <img
                    src={item.url1}
                    alt={item.company}
                    style={{
                      width: "50px",
                      marginRight: "5px",
                      border: "2px black",
                    }}
                  />
                  {item.company}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item)}
                  >
                    削除
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p
              style={{ textAlign: "left", marginTop: "5px", marginBottom: "0" }}
            >
              商品総数: {totalQuantity}
            </p>
          </div>
        </div>
      </Tooltip>
    );
  };

  // ...

  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Form
              className="d-flex"
              style={{
                maxWidth: "400px",
                backgroundColor: "white",
                maxHeight: "50px",
                margin: "auto",
              }}
            >
              {/* <Form.Control
                type="search"
                placeholder="検索"
                // className="me-3 mx-5"
                style={{ width: "300px" }}
                aria-label="検索"
              />
              <Button variant="outline-success">Search</Button> */}
            </Form>
          </Nav>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
            show={showCartTable}
          >
            <Navbar.Text
              style={{
                backgroundColor: "",
                color: "#fff",
                fontSize: "40px",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "3rem",
              }}
              onClick={() => handleIconClick()}
              onMouseEnter={handleIconHover}
              onMouseLeave={handleIconLeave}
            >
              <MdOutlineLocalGroceryStore />
              {cartItemCount >= 0 && (
                <span className="cartItemCount">{cartItemCount}</span>
              )}
            </Navbar.Text>
          </OverlayTrigger>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Search;

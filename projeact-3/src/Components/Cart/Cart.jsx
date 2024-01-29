import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import "./cart.css";

function CurrencyDisplay({ value, currency = "JPY" }) {
  const formattedValue = value.toLocaleString("ja-JP");
  return (
    <span>
      {formattedValue} {currency}
    </span>
  );
}

function Cart() {
  const location = useLocation();
  const cartItemList = location.state?.cartItemsList || [];

  // ... (phần mã khác)
  const [quantity, setQuantity] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  // Thêm các state cho thông tin người mua
  const [loggedInUserInfo, setLoggedInUserInfo] = useState({
    userName: "",
    email: "",
    address: "",
    phone: "",
  });

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const getLoggedInUserId = () => {
    const storedUserInfo = localStorage.getItem("user");
    const userInfoObject = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    return userInfoObject ? userInfoObject.id : null;
  };

  const handlePayment = () => {
    // Kiểm tra xem thông tin người mua đã được nhập đầy đủ hay chưa
    if (!userName || !email || !address || !phone) {
      // Thông báo lỗi hoặc hiển thị modal lỗi nếu cần
      alert("購入者情報を入力してください。");
      return;
    }

    // Lưu thông tin người mua vào localStorage
    const paymentInfo = {
      cartItems: cartItemList,
      buyerInfo: {
        userName: userName,
        email: email,
        address: address,
        phone: phone,
      },
      totalPrice: totalPrice,
    };
    localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    updateTotalPrice();
    // Set default quantity for each item to 1
    const defaultQuantities = {};
    cartItemList.forEach((_, index) => {
      defaultQuantities[index] = 1;
    });
    setQuantity(defaultQuantities);

    // Calculate and set initial total price
    updateTotalPrice();
  }, [cartItemList]);

  useEffect(() => {
    updateTotalPrice();
  }, [quantity]);
  useEffect(() => {
    const fetchLoggedInUserInfo = async () => {
      try {
        const userId = getLoggedInUserId();
        const response = await fetch(`http://localhost:8000/users/${userId}`);
        const data = await response.json();

        // Cập nhật state với thông tin từ API
        setLoggedInUserInfo({
          userName: data.username || "",
          email: data.email || "",
          address: data.address || "",
          phone: data.phone || "",
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchLoggedInUserInfo();
  }, []);

  const increaseQuantity = (index) => {
    setQuantity((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      updatedQuantities[index] = (updatedQuantities[index] || 0) + 1;
      return updatedQuantities;
    });
  };

  const decreaseQuantity = (index) => {
    setQuantity((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      updatedQuantities[index] = Math.max(
        (updatedQuantities[index] || 0) - 1,
        0
      );
      return updatedQuantities;
    });
  };

  const updateTotalPrice = () => {
    let total = 0;
    cartItemList.forEach((item, index) => {
      total += (quantity[index] || 0) * item.price;
    });
    setTotalPrice(total);
  };

  return (
    <div className="cart-container">
      <>
        <h1>Ｓｕｐｅｒ　Ｓｈｏｅｓ</h1>
        <h3>1.Your Order</h3>
        {/* hiển thị danh sách trong giỏ hàng */}

        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Company</th>
              <th style={{ textAlign: "center" }}>Quantity</th>
              <th style={{ textAlign: "center" }}></th>
            </tr>
          </thead>
          <tbody>
            {cartItemList.map((item, index) => (
              <tr key={index} style={{ borderBottom: "1px solid" }}>
                <td>
                  <img
                    src={item.images[0]}
                    alt={item.company}
                    style={{
                      textAlign: "center",
                      width: "50px",
                      marginLeft: "20px",
                      marginRight: "5px",
                    }}
                  ></img>
                </td>
                <td style={{ width: "550px", fontSize: "15px" }}>
                  {item.company}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    width: "100px",
                    borderRight: "1px solid",
                  }}
                >
                  {quantity[index] || 0}
                </td>
                <td style={{ width: "" }}>
                  <button
                    className="btn"
                    style={{ fontWeight: "bold", fontSize: "25px" }}
                    onClick={() => decreaseQuantity(index)}
                  >
                    -
                  </button>

                  <button
                    className="btn"
                    style={{ fontWeight: "bold", fontSize: "25px" }}
                    onClick={() => increaseQuantity(index)}
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th style={{ fontSize: "2rem" }}>合計</th>
              <td style={{ fontSize: "1.5rem" }}>
                <CurrencyDisplay value={totalPrice}></CurrencyDisplay>
              </td>
            </tr>
          </tfoot>
        </table>
        <h3>2.購入者情報</h3>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>名前</Form.Label>
              <Form.Control
                placeholder="User name"
                value={loggedInUserInfo.userName}
                onChange={(e) =>
                  setLoggedInUserInfo((prevInfo) => ({
                    ...prevInfo,
                    userName: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>メール</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={loggedInUserInfo.email}
                onChange={(e) =>
                  setLoggedInUserInfo((prevInfo) => ({
                    ...prevInfo,
                    email: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>住所</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              value={loggedInUserInfo.address}
              onChange={(e) =>
                setLoggedInUserInfo((prevInfo) => ({
                  ...prevInfo,
                  address: e.target.value,
                }))
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>電話番号</Form.Label>
            <Form.Control
              placeholder="080 XXXX XXXX"
              value={loggedInUserInfo.phone}
              onChange={(e) =>
                setLoggedInUserInfo((prevInfo) => ({
                  ...prevInfo,
                  phone: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Form>
        <h3>3.Choose a payment method</h3>

        <div id="head">
          <div className="class1">
            <div className="card" style={{ width: "18rem", height: "auto" }}>
              <img
                src="https://paytmblogcdn.paytm.com/wp-content/uploads/2022/01/row200_ATM_What-are-the-Types-of-ATM-Cards-800x500.png"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">クレジットカード</h5>
                <p className="card-text">If you want to save time use a card</p>
                <input
                  type="radio"
                  name="cart-pay"
                  id=""
                  onChange={() => setSelectedPaymentMethod("クレジットカード")}
                />
              </div>
            </div>
          </div>
          <div className="class2">
            <div className="card" style={{ width: "18rem", height: "auto" }}>
              <img
                src="https://static.minne.com/productimages/131257383/w1600xh1600/f030b7a892af7b5a7a50699dc9ee575b91973400.jpeg?1634058609"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">コンビニ</h5>
                <p className="card-text">
                  If you want to pay quickly and conveniently
                </p>
                <input
                  type="radio"
                  name="cart-pay"
                  id=""
                  onChange={() => setSelectedPaymentMethod("コンビニ")}
                />
              </div>
            </div>
          </div>
          <div className="class3">
            <div className="card" style={{ width: "18rem", height: "auto" }}>
              <img
                src="https://www.ryutsuu.biz/images/2019/06/20190605plant.jpg"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">電子マネー</h5>
                <p className="card-text">If you want to pay by phone app</p>
                <input
                  type="radio"
                  name="cart-pay"
                  id=""
                  onChange={() => setSelectedPaymentMethod("Another Buy")}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>請求情報</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>支払い成功</h3>
              <p>購入者情報:</p>
              <p>名前: {loggedInUserInfo.userName}</p>
              <p>メールアドレス: {loggedInUserInfo.email}</p>
              <p>住所: {loggedInUserInfo.address}</p>
              <p>電話番号: {loggedInUserInfo.phone}</p>
              <p>支払方法: {selectedPaymentMethod}</p>
              <p>
                合計は <CurrencyDisplay value={totalPrice}></CurrencyDisplay>
              </p>
              {/* ... (các thông tin khác như sản phẩm và tổng giá tiền) */}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              {/* Các nút khác nếu cần */}
            </Modal.Footer>
          </Modal>
        </div>
        <h2>
          <Button
            size="lg"
            variant="success"
            style={{ padding: "1rem", margin: "2rem" }}
            onClick={handlePayment}
          >
            注文する
          </Button>{" "}
          <CurrencyDisplay value={totalPrice}></CurrencyDisplay>
        </h2>

        <div className="container-qr">
          <div className="qr">
            {" "}
            <h4>MyFaceBook</h4>
            <img
              src="https://cdn.icon-icons.com/icons2/832/PNG/512/fb_icon-icons.com_66689.png"
              width={200}
              height={200}
            />
          </div>
          <div className="qr">
            <h4>MyYouTube</h4>
            <img
              src="https://yt3.googleusercontent.com/584JjRp5QMuKbyduM_2k5RlXFqHJtQ0qLIPZpwbUjMJmgzZngHcam5JMuZQxyzGMV5ljwJRl0Q=s176-c-k-c0x00ffffff-no-rj"
              width={200}
              height={200}
            />
          </div>
        </div>
      </>
    </div>
  );
}

export default Cart;

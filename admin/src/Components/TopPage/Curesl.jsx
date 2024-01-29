import Carousel from "react-bootstrap/Carousel";

function Curesl() {
  const containerStyle = {
    margin: "2rem auto",
    padding: "1.5rem",

    backgroundImage:
      "url(https://as2.ftcdn.net/v2/jpg/01/74/04/87/1000_F_174048760_ato1qTnJZMyWn1WkPmNVcyWQUZz8WoNw.jpg)",
    backgroundRepeat: "repeat",
  };
  const imgSrc = [
    "/image/q1.png",
    "/image/q3.png",
    "/image/q4.png",
    "/image/q5.png",
  ];

  return (
    <div style={containerStyle}>
      <Carousel data-bs-theme="dark">
        {imgSrc.map((src, index) => (
          <Carousel.Item>
            <img
              className="d-block mx-auto w-80"
              src={process.env.PUBLIC_URL + src}
              alt="First slide"
              width="575px"
              height="339px"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Curesl;

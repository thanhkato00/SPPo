import React from "react";
import "./Footer.css"
function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-main">
          <div className="footer-1">
            <p>ショッピンについて</p>
            <p>越境ECをはじめる</p>
            <p>セラー事例</p>
          </div>
          <div className="footer-1">
            <p>お役立ち情報</p>
            <p>リサーチ</p>
          </div>
          <div className="footer-1">
            <p>パートナー</p>
          </div>
          <div className="footer-1">
            <a
              href="https://www.facebook.com/profile.php?id=100027798062040"
              target="_blank"
            >
              <img
                src="https://i.pinimg.com/550x/ee/94/4f/ee944fdd41163548f1df6abb8d77d9d8.jpg"
                alt="Facebook Icon"
                width={70}
                height={70}
              />
            </a>
            <a
              href="https://www.instagram.com/t.d_1799/?igshid=OGQ5ZDc2ODk2ZA%3D%3D&fbclid=IwAR3i0r75MsCknAXZsMW2jdBF-MjfabDryVAp7ikQC_w2x6QJPgKzRTOsM-o"
              target="_blank"
            >
              <img
                src="https://vi.seaicons.com/wp-content/uploads/2016/08/Instagram-icon-3.png"
                alt="instagram Icon"
                width={70}
                height={70}
              />
            </a>
          </div>
          <a
            href="https://www.instagram.com/t.d_1799/?igshid=OGQ5ZDc2ODk2ZA%3D%3D&fbclid=IwAR3i0r75MsCknAXZsMW2jdBF-MjfabDryVAp7ikQC_w2x6QJPgKzRTOsM-o"
            target="_blank"
          ></a>
          <div className="footer-1"></div>
        </div>
        <div className="contact-info">
          <h2>
            {" "}
            <p>住所:大阪市 東成区 玉津３－５－１２</p>
          </h2>
          <h3>
            <p>電話番号: 0123 456 789</p>
          </h3>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

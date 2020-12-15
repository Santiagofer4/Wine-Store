import React from 'react';
import './Footer.modules.css';

function Footer() {
  return (
    <div className="footer">
      <div className="logoContainer">
        <img
          className="logoFooter"
          src="https://i.ibb.co/ZgYc39Z/barricalogo.png"
          alt="Barrica"
        ></img>
      </div>
      <div className="rrssContainer">
        <div className="rrssImgContainer">
          <img
            className="rrssImg"
            src="https://i.ibb.co/BqqLs9K/facebook.png"
            alt="Facebook"
          ></img>
        </div>
        <div className="rrssImgContainer">
          <img
            className="rrssImg"
            src="https://i.ibb.co/99zj8JW/instagram.png"
            alt="Instagram"
          ></img>
        </div>
        <div className="rrssImgContainer">
          <img
            className="rrssImg"
            src="https://i.ibb.co/7k1PcxV/twitter.png"
            alt="Twitter"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Footer;

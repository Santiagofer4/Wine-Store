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
        <a href="#" className='red' ><i class="fab fa-facebook-f"></i></a>

        </div>
        <div className="rrssImgContainer">
          <a href="#" className='red__instagram'><i class="fab fa-instagram"></i></a>
        </div>
        <div className="rrssImgContainer">
          <a href="#" className='red__instagram'><i class="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>
  );
}

export default Footer;

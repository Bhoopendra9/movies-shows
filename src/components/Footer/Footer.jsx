import React from "react";
import "./Footer.scss";

import ContentWrapper from "../ContentWrapper/ContentWrapper";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          similique ratione exercitationem, veritatis iure obcaecati omnis sint
          deserunt cupiditate ducimus. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Culpa, eveniet.
        </div>
        <div className="socialIcons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;

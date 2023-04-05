import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <p>
        <a href="/" className="hvr-underline">
          JobHunt
        </a>{" "}
        is a job social networking website (A constructive and inclusive social
        network)
      </p>
      <p>
        Made with love by{" "}
        <a href="https://github.com/NhatNL01" className="hvr-underline">
          NhatNL
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;

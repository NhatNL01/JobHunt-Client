import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcome">
      <h2 className="welcome__title">Welcome to JobHunt</h2>
      <p className="welcome__slogan">
        <Link to="/">JobHunt</Link> is a job social networking website
      </p>
    </div>
  );
};

export default Welcome;

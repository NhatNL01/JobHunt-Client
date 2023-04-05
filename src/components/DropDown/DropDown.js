import React from "react";
import "./DropDown.css";

const Dropdown = ({ handleSelect, menu, isMobile }) => {
  return (
    <select
      onChange={handleSelect}
      className={`classic ${isMobile ? "drop-down--mobile" : "drop-down"}`}>
      {menu.map((item, index) => {
        return (
          <option className="option" key={index} value={item.toLowerCase()}>
            {item}
          </option>
        );
      })}
      {/* <option value="post">Post</option>
      <option value="job">Job</option> */}
    </select>
  );
};

export default Dropdown;

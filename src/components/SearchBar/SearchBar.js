import React, { Fragment, useState } from "react";
import useSearch from "../../hooks/useSearch.js";
import DropDown from "../../components/DropDown/DropDown";

const SearchBar = (props) => {
  const { search } = useSearch();
  const [value, setValue] = useState("");
  const [type, setType] = useState("post");

  //handle input change for search bar
  const onInputChange = (evt) => {
    setValue(evt.target.value);
  };

  //handle 'enter' press event
  const onEnterKey = (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      search(value, type);
      setValue("");
    }
  };

  const handleSelect = (e) => {
    setType(e.target.value);
  };

  return (
    <Fragment>
      <input
        className={
          props.showSearchOnMobile ? "search-bar--mobile " : "search-bar "
        }
        key="random1"
        value={value}
        placeholder={"Search..."}
        onChange={onInputChange}
        onKeyDown={onEnterKey}
      />
      <DropDown handleSelect={handleSelect} menu={["Post", "Job"]} />
    </Fragment>
  );
};

export default SearchBar;

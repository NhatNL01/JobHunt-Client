import React, { useEffect, useRef, useState } from "react";
import "easymde/dist/easymde.min.css";
import "./TypeRadioInput.css";

export const TypeRadioInput = (props) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const valueRef = useRef();
  valueRef.current = { value, isValid };
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onChange = (e) => {
    if (e.target.value !== "") {
      setValue(e.target.value);
      if (valueRef.current.value !== "") {
        setIsValid(true);
      } else {
        setIsValid(false);
      }

      props.onChange("type", e.target.value, valueRef.current.isValid);
    }
  };

  return (
    <>
      <h4>{props.label}</h4>
      <div className="flex">
        <div className="flex">
          <input
            onClick={onChange}
            type="radio"
            id="post"
            name="posttype"
            value="post"
          />
          <label htmlFor="post">Post</label>
        </div>
        <div className="flex">
          <input
            onClick={onChange}
            type="radio"
            id="jobPost"
            name="posttype"
            value="job"
          />
          <label htmlFor="jobPost">Job</label>
        </div>
      </div>
    </>
  );
};

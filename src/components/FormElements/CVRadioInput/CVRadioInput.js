import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useHttpClient from "../../../hooks/useHttpClient";
import { AuthContext } from "../../../context/auth";
import "easymde/dist/easymde.min.css";
import "./CVRadioInput.css";

export const CVRadioInput = (props) => {
  const history = useHistory();
  const handleRedirect = useCallback((url) => history.push(url), [history]);
  const auth = useContext(AuthContext);
  const { currentUser } = auth;
  const [cvs, setCvs] = useState();
  const { sendReq } = useHttpClient();

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/cvs/user/${currentUser.userId}`,
          "GET",
          null,
          { Authorization: `Bearer ${currentUser.token}` }
        );
        setCvs(responseData.cvs);
      } catch (err) {}
    };
    fetchCvs();
  }, [sendReq, currentUser]);

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

      props.onChange("cv", e.target.value, valueRef.current.isValid);
    }
  };

  return (
    <>
      <h4>{props.label}</h4>
      <div className="flex flex-cv-list">
        {!cvs ? (
          <>
            <h4>
              You have to
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#4f45e5",
                }}
                onMouseDown={() =>
                  handleRedirect(`/cvs/${currentUser && currentUser.userId}`)
                }>
                {` add your CV `}
              </span>
              before apply this job!
            </h4>
            {/* <button
              className="btn dropdown__btn bg-add"
              onMouseDown={() =>
                handleRedirect(`/cvs/${currentUser && currentUser.userId}`)
              }>
              Add your CV in here
            </button> */}
          </>
        ) : (
          cvs.map((cv) => {
            return (
              <div className="flex flex-cv-item">
                <input
                  onClick={onChange}
                  type="radio"
                  id={cv.id}
                  name="cvType"
                  value={cv.id}
                />
                <label htmlFor={cv.id}>{cv.name}</label>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

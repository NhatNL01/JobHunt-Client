import React, { useState, useEffect, useContext } from "react";
import ErrorModal from "../../components/Modal/ErrorModal";
import useHttpClient from "../../hooks/useHttpClient";
import CompanyList from "../../components/CompanyList/CompanyList";

const Compamies = () => {
  const [loadedCompanies, setLoadedCompanies] = useState([]);
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/companies`,
          "GET"
        );
        setLoadedCompanies(responseData.companies);
      } catch (err) {}
    };
    fetchCompanies();
  }, [sendReq]);
  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <div className="container-posts reading-list">
        <h2 className="reading-list__heading" style={{ fontSize: "20px" }}>
          Company List:
        </h2>

        {loadedCompanies ? (
          <CompanyList
            cover={false}
            items={loadedCompanies}
            isLoading={isLoading}
          />
        ) : (
          <p>Company list is empty!</p>
        )}
      </div>
    </>
  );
};

export default Compamies;

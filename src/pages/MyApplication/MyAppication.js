import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useHttpClient from "../../hooks/useHttpClient";
import { AuthContext } from "../../context/auth";
import ListImage from "../../components/ListImage/ListImage";

import "./MyAppliction.scss";
import { DataGrid } from "@mui/x-data-grid";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import SyntaxHighlight from "../../components/SyntaxHighlight/SyntaxHighlight";

const MyApplication = () => {
  const [loadedApplications, setLoadedApplications] = useState([]);
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const { sendReq } = useHttpClient();
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/applications/user/${userId}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${currentUser.token}`,
          }
        );
        setLoadedApplications(responseData.applications);
      } catch (err) {}
    };
    fetchApplications();
  }, [sendReq, currentUser, userId]);

  const columns = [
    // { field: "id", headerName: "Application ID", width: 155 },
    {
      field: "author",
      headerName: "Author",
      width: 160,
      renderCell: (params) => {
        return <div className="userListField">{params.row.author.name}</div>;
      },
    },
    {
      field: "job",
      headerName: "Job",
      width: 160,
      renderCell: (params) => {
        return <div className="userListField">{params.row.job.title}</div>;
      },
    },
    {
      field: "cv",
      headerName: "CV",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="userListField">
            <ListImage images={[params.row.cv?.image]} />
          </div>
        );
      },
    },
    {
      field: "body",
      headerName: "Body",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="post__text">
            <ReactMarkdown components={SyntaxHighlight}>
              {params.row.body}
            </ReactMarkdown>
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <button
              className={`editButton ${
                params.row.status === "Pending"
                  ? "pending"
                  : params.row.status === "Approved"
                  ? "approved"
                  : "rejected"
              }`}>
              {params.row.status}
            </button>
          </>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 400,
    },
  ];
  return (
    <>
      {/* <ErrorModal error={error} onClose={clearError} /> */}
      <div className="userListPage">
        <DataGrid
          rows={loadedApplications}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
          getRowHeight={() => "auto"}
        />
      </div>
    </>
  );
};

export default MyApplication;

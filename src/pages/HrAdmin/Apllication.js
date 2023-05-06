import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useHttpClient from "../../hooks/useHttpClient";
import { AuthContext } from "../../context/auth";
import ListImage from "../../components/ListImage/ListImage";

import "./HrAdmin.scss";
import { DataGrid } from "@mui/x-data-grid";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import SyntaxHighlight from "../../components/SyntaxHighlight/SyntaxHighlight";

const Application = () => {
  const [loadedApplications, setLoadedApplications] = useState([]);
  const [reLoad, setReload] = useState(false);
  const { jobId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const { sendReq } = useHttpClient();
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/applications/job/${jobId}`,
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
  }, [sendReq, currentUser, reLoad, jobId]);

  const handleUpdateApplicationStatus = async (id, status) => {
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/applications/${id}`,
        "PUT",
        JSON.stringify({
          status: status,
        }),
        {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        }
      );
      setReload(!reLoad);
      // history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleApproveApplication = async (id) => {
    handleUpdateApplicationStatus(id, "Approved");
  };
  const handleRejectApplication = async (id) => {
    handleUpdateApplicationStatus(id, "Rejected");
  };

  const columns = [
    { field: "id", headerName: "Application ID", width: 155 },
    {
      field: "author",
      headerName: "Author",
      width: 160,
      renderCell: (params) => {
        return <div className="userListField">{params.row.author?.name}</div>;
      },
    },
    {
      field: "cv",
      headerName: "CV",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="userListField">
            {/* <img src={params.row.cv.image} alt="cv" /> */}
            {/* {params.row.cv.name} */}
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
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "Pending" ? (
              <>
                <button
                  onClick={() => handleApproveApplication(params.row.id)}
                  className={`editButton approved`}>
                  Approve
                </button>
                <button
                  onClick={() => handleRejectApplication(params.row.id)}
                  className={`editButton rejected`}>
                  Reject
                </button>
              </>
            ) : (
              <div>No actions</div>
            )}
          </>
        );
      },
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

export default Application;

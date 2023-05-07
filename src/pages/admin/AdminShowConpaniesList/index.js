import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "antd/dist/antd.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import ListImage from "../../../components/ListImage/ListImage";

import "./styles.scss";
import { AuthContext } from "../../../context/auth";
import useHttpClient from "../../../hooks/useHttpClient";

const AdminShowCompaniesList = () => {
  const [loadedCompanies, setLoadedCompanies] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { sendReq } = useHttpClient();
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/companies`,
          "GET",
          null,
          {
            Authorization: `Bearer ${currentUser.token}`,
          }
        );
        setLoadedCompanies(responseData.companies);
      } catch (err) {}
    };
    fetchApplications();
  }, [sendReq, currentUser.token]);

  const handleDelete = async (id) => {
    const isDelete = window.confirm("Are you sure for deleting this company?");
    if (isDelete) {
      setLoadedCompanies(loadedCompanies.filter((item) => item.id !== id));
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/companies/${id}`,
        "DELETE",
        null,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
    }
  };

  const columns = [
    // { field: "id", headerName: "Application ID", width: 155 },
    {
      field: "id",
      headerName: "ID",
      width: 220,
      renderCell: (params) => {
        return <div className="userListField">{params.row.id}</div>;
      },
    },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="userListField h-28">
            <ListImage images={[params.row.avatar]} />
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Short Description",
      width: 300,
      renderCell: (params) => {
        return <div className="userListField">{params.row.description}</div>;
      },
    },
    {
      field: "foundedYear",
      headerName: "Founded Year",
      width: 120,
      renderCell: (params) => {
        return <div className="userListField">{params.row.foundedYear}</div>;
      },
    },
    {
      field: "scale",
      headerName: "Scale",
      width: 80,
      renderCell: (params) => {
        return <div className="userListField">{params.row.scale}</div>;
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 180,
      renderCell: (params) => {
        return <div className="userListField">{params.row.address}</div>;
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 120,
      renderCell: (params) => {
        return <div className="userListField">{params.row.contact}</div>;
      },
    },
    {
      field: "joinDate",
      headerName: "JoinDate",
      width: 220,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className="h-screen w-5/6">
        <DataGrid
          rows={loadedCompanies}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
          getRowHeight={() => "auto"}
          sx={{
            textAlign: "center",
            fontSize: 15,
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
        />
      </div>
    </>
  );
};

export default AdminShowCompaniesList;

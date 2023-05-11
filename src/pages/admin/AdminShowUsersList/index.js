import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "antd/dist/antd.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ListImage from "../../../components/ListImage/ListImage";

import "./styles.scss";
import { AuthContext } from "../../../context/auth";
import useHttpClient from "../../../hooks/useHttpClient";

const AdminShowUsersList = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { sendReq } = useHttpClient();
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/users`,
          "GET",
          null,
          {
            Authorization: `Bearer ${currentUser.token}`,
          }
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchApplications();
  }, [sendReq, reload, currentUser.token]);

  const handleLock = async (id) => {
    const isLock = window.confirm("Are you sure to lock this user?");
    if (isLock) {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/users/${id}/lock`,
        "PATCH",
        null,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
      setReload(!reload);
    }
  };
  const handleUnLock = async (id) => {
    const isLock = window.confirm("Are you sure to unlock this user?");
    if (isLock) {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/users/${id}/unlock`,
        "PATCH",
        null,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
      setReload(!reload);
    }
  };

  const columns = [
    // { field: "id", headerName: "Application ID", width: 155 },
    {
      field: "id",
      headerName: "ID",
      width: 180,
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
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        return <div className="userListField">{params.row.name}</div>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => {
        return <div className="userListField">{params.row.email}</div>;
      },
    },
    {
      field: "posts",
      headerName: "Total post",
      width: 80,
      renderCell: (params) => {
        return <div className="userListField">{params.row.posts?.length}</div>;
      },
    },
    {
      field: "followers",
      headerName: "Followers Number",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListField">{params.row.followers?.length}</div>
        );
      },
    },

    {
      field: "role",
      headerName: "Role",
      width: 100,
      renderCell: (params) => {
        return <div className="userListField">{params.row.role}</div>;
      },
    },
    {
      field: "joinDate",
      headerName: "Date",
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      width: 60,
      renderCell: (params) => {
        return (
          <>
            {params.row.active ? (
              <button
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                }}>
                <LockIcon
                  className="deleteButton"
                  onClick={() => handleLock(params.row.id)}
                />
              </button>
            ) : (
              <button
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                }}>
                <LockOpenIcon
                  className="deleteButton"
                  onClick={() => handleUnLock(params.row.id)}
                />
              </button>
            )}
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className="h-screen w-5/6">
        {/* <Link style={{ margin: "10px" }} to={`/admin/create-user`}>
          <button className='btn-createProduct btn btn-primary'>
            Create user
          </button>
        </Link> */}
        <DataGrid
          rows={loadedUsers}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          autoHeight
          getRowHeight={() => "auto"}
          sx={{
            textAlign: "center",
            fontSize: 12,
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

export default AdminShowUsersList;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "antd/dist/antd.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import ListImage from "../../../components/ListImage/ListImage";

import "./styles.scss";
import { AuthContext } from "../../../context/auth";
import useHttpClient from "../../../hooks/useHttpClient";

const AdminShowUsersList = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
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
  }, [sendReq, currentUser.token]);

  const handleDelete = async (id) => {
    // const isDelete = window.confirm("Bạn có chắc muốn xóa không?");
    // if (isDelete) {
    //   // setData(data.filter((item) => item._id !== id));
    //   await sendReq(
    //     `${process.env.REACT_APP_BASE_URL}/posts/`,
    //     "DELETE",
    //     null,
    //     {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${currentUser.token}`,
    //     }
    //   );
    // }
  };

  const columns = [
    // { field: "id", headerName: "Application ID", width: 155 },
    {
      field: "id",
      headerName: "ID",
      width: 250,
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
      width: 180,
      renderCell: (params) => {
        return <div className="userListField">{params.row.name}</div>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: (params) => {
        return <div className="userListField">{params.row.email}</div>;
      },
    },
    {
      field: "posts",
      headerName: "Total post",
      width: 100,
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
        {/* <Link style={{ margin: "10px" }} to={`/admin/create-user`}>
          <button className='btn-createProduct btn btn-primary'>
            Create user
          </button>
        </Link> */}
        <DataGrid
          rows={loadedUsers}
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

export default AdminShowUsersList;

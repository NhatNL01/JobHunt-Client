import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "antd/dist/antd.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import ListImage from "../../../components/ListImage/ListImage";

import "./styles.scss";
import { AuthContext } from "../../../context/auth";
import useHttpClient from "../../../hooks/useHttpClient";

const AdminShowPostsList = () => {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { sendReq } = useHttpClient();
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/posts/all`,
          "GET",
          null,
          {
            Authorization: `Bearer ${currentUser.token}`,
          }
        );
        setLoadedPosts(responseData.posts);
      } catch (err) {}
    };
    fetchApplications();
  }, [sendReq, currentUser.token]);

  const handleDelete = async (titleUrl, id) => {
    const isDelete = window.confirm("Are you sure for deleting this post?");
    if (isDelete) {
      setLoadedPosts(loadedPosts.filter((item) => item.id !== id));
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/posts/${titleUrl}/${id}`,
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
      width: 180,
      renderCell: (params) => {
        return <div className="userListField">{params.row.id}</div>;
      },
    },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="userListField h-28">
            <ListImage images={[params.row.image]} />
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Tile",
      width: 250,
      renderCell: (params) => {
        return <div className="userListField">{params.row.title}</div>;
      },
    },
    // {
    //   field: "body",
    //   headerName: "Body",
    //   width: 180,
    //   renderCell: (params) => {
    //     return <div className="userListField">{params.row.body}</div>;
    //   },
    // },
    {
      field: "author",
      headerName: "Author",
      width: 150,
      renderCell: (params) => {
        return <div className="userListField">{params.row.author?.name}</div>;
      },
    },

    {
      field: "likes",
      headerName: "Likes",
      width: 80,
      renderCell: (params) => {
        return <div className="userListField">{params.row.likes?.length}</div>;
      },
    },
    {
      field: "bookmarks",
      headerName: "Bookmarks",
      width: 80,
      renderCell: (params) => {
        return (
          <div className="userListField">{params.row.bookmarks?.length}</div>
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
      renderCell: (params) => {
        return <div className="userListField">{params.row.type}</div>;
      },
    },
    {
      field: "date",
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
            <DeleteOutline
              className="deleteButton"
              onClick={() => handleDelete(params.row.titleUrl, params.row.id)}
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
          rows={loadedPosts}
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

export default AdminShowPostsList;

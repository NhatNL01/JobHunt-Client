import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "antd/dist/antd.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import ListImage from "../../../components/ListImage/ListImage";

import "./styles.scss";
import { AuthContext } from "../../../context/auth";
import useHttpClient from "../../../hooks/useHttpClient";

const AdminShowTagsList = () => {
  const [loadedTags, setLoadedTags] = useState([]);
  const [reload, setReload] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { sendReq } = useHttpClient();
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/tags`,
          "GET",
          null,
          {
            Authorization: `Bearer ${currentUser.token}`,
          }
        );
        setLoadedTags(responseData.tags);
      } catch (err) {}
    };
    fetchApplications();
  }, [sendReq, reload, currentUser.token]);

  const handleDelete = async (id) => {
    const isDelete = window.confirm("Are you sure for deleting this tag?");
    if (isDelete) {
      // setLoadedTags(loadedTags.filter((item) => item.id !== id));
      setReload(!reload);
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/tags/${id}`,
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
        return <div className="userListField h-16">{params.row.id}</div>;
      },
    },
    {
      field: "name",
      headerName: "Tag name",
      width: 150,
      renderCell: (params) => {
        return <div className="userListField">{params.row.name}</div>;
      },
    },
    {
      field: "followers",
      headerName: "Followers Number",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListField">{params.row.followers?.length}</div>
        );
      },
    },
    {
      field: "posts",
      headerName: "Posts Number",
      width: 150,
      renderCell: (params) => {
        return <div className="userListField">{params.row.posts?.length}</div>;
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 180,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <DeleteOutline
    //           className="deleteButton"
    //           onClick={() => handleDelete(params.row.id)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];
  return (
    <>
      <div className="h-screen w-5/6">
        <DataGrid
          rows={loadedTags}
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

export default AdminShowTagsList;

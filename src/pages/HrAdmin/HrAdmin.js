import React, { useState, useEffect, useContext } from "react";
import useHttpClient from "../../hooks/useHttpClient";
import { AuthContext } from "../../context/auth";

import "./HrAdmin.scss";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

const HrAdmin = () => {
  const [loadedPosts, setLoadedPosts] = useState([]);
  // const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const { sendReq } = useHttpClient();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/posts/type/job/user/${currentUser.userId}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${currentUser.token}`,
          }
        );
        setLoadedPosts(responseData.posts);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendReq, currentUser]);

  // const handleDelete = (id) => {
  //   setLoadedPosts(data.filter((item) => item.id !== id));
  // };

  const columns = [
    { field: "id", headerName: "Job ID", width: 265 },
    {
      field: "title",
      headerName: "Title",
      width: 360,
      renderCell: (params) => {
        return (
          <div className="userListField">
            <img src={params.row.image} alt="avatar" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "titleURL", headerName: "Title URL", width: 120 },
    {
      field: "date",
      headerName: "Date",
      width: 350,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/hradmin/applications/${params.row.id}`}>
              <button className="editButton ">Detail</button>
            </Link>
            {/* <DeleteOutline
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            /> */}
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
          rows={loadedPosts}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          // checkboxSelection
          autoHeight
        />
      </div>
    </>
    // {/* <ErrorModal error={error} onClose={clearError} />
    // <div className="container-posts reading-list">
    //   <h2 className="reading-list__heading">
    //     {currentUser && `${currentUser.name}'s Reading list`}
    //   </h2>

    //   {loadedPosts ? (
    //     <PostList cover={false} items={loadedPosts} isLoading={isLoading} />
    //   ) : (
    //     <p>Your reading list is empty!</p>
    //   )}
    // </div> */}
  );
};

export default HrAdmin;

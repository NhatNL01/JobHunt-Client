import "./featuredInfo.scss";
import { useContext, useEffect, useState } from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { AuthContext } from "../../../../context/auth";
import useHttpClient from "../../../../hooks/useHttpClient";

const FeaturedInfo = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [loadedTags, setLoadedTags] = useState([]);
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
  }, [sendReq, currentUser.token]);

  return (
    <div className="featuredInfoComponent">
      <div className="item">
        <span className="title">Total User</span>
        <div>
          <span className="money">{loadedUsers.length}</span>
          {/* <span className="moneyRate">
            +12,4 <ArrowUpward className="icon" />
          </span> */}
        </div>
        {/* <span className='sub'>Compared to last month</span> */}
      </div>

      <div className="item">
        <span className="title">Total Posts</span>
        <div>
          <span className="money">{loadedPosts.length}</span>
          {/* <span> VNĐ</span> */}
          {/* <span className="moneyRate">
            -1,4 <ArrowDownward className="icon negative" />
          </span> */}
        </div>
        {/* <span className='sub'>Compared to last month</span> */}
      </div>

      <div className="item">
        <span className="title">Total Tags</span>
        <div>
          <span className="money">{loadedTags.length}</span>
          <span className="moneyRate">
            {/* -11,4 <ArrowDownward className="icon negative" /> */}
          </span>
        </div>
        {/* <span className='sub'>Compared to last month</span> */}
      </div>
    </div>
  );
};

export default FeaturedInfo;

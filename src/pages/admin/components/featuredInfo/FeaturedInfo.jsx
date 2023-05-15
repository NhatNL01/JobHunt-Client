import "./featuredInfo.scss";
import { useContext, useEffect, useState } from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { AuthContext } from "../../../../context/auth";
import useHttpClient from "../../../../hooks/useHttpClient";

const FeaturedInfo = () => {
  const dateNow = new Date();
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

  let comparePost =
    loadedPosts.filter((post) => {
      let d = new Date(post.date);
      return d.getMonth() == dateNow.getMonth();
    }).length /
    loadedPosts.filter((post) => {
      let d = new Date(post.date);
      return d.getMonth() == dateNow.getMonth() - 1;
    }).length;
  comparePost = comparePost * 100;

  let compareUser =
    loadedUsers.filter((user) => {
      let d = new Date(user.joinDate);
      return d.getMonth() == dateNow.getMonth();
    }).length /
    loadedUsers.filter((user) => {
      let d = new Date(user.joinDate);
      return d.getMonth() == dateNow.getMonth() - 1;
    }).length;
  compareUser = compareUser * 100;
  return (
    <div className="featuredInfoComponent">
      <div className="item">
        <span className="title">New User</span>
        <div>
          <span className="money">
            {
              loadedUsers.filter((post) => {
                let d = new Date(post.joinDate);
                return d.getMonth() == dateNow.getMonth();
              }).length
            }
          </span>
          <span className="moneyRate">
            {compareUser <= 100
              ? (100 - compareUser).toFixed(2)
              : (compareUser - 100).toFixed(2)}
            {" %"}
            {compareUser < 100 ? (
              <ArrowDownward className="icon negative" />
            ) : (
              <ArrowUpward className="icon" />
            )}
          </span>
        </div>
        <span className="sub">Compared to last month</span>
      </div>

      <div className="item">
        <span className="title">New Posts</span>
        <div>
          <span className="money">
            {
              loadedPosts.filter((post) => {
                let d = new Date(post.date);
                return d.getMonth() == dateNow.getMonth();
              }).length
            }
          </span>
          <span className="moneyRate">
            {comparePost <= 100
              ? (100 - comparePost).toFixed(2)
              : (comparePost - 100).toFixed(2)}
            {" %"}
            {comparePost <= 100 ? (
              <ArrowDownward className="icon negative" />
            ) : (
              <ArrowUpward className="icon" />
            )}
          </span>
        </div>
        <span className="sub">Compared to last month</span>
      </div>

      <div className="item">
        <span className="title">Total Tags</span>
        <div>
          <span className="money">{loadedTags.length}</span>
          {/* <span className="moneyRate">
            -11,4 <ArrowDownward className="icon negative" />
          </span> */}
        </div>
        {/* <span className="sub">Compared to last month</span> */}
      </div>
    </div>
  );
};

export default FeaturedInfo;

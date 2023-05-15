import React, { useContext, useEffect, useState } from "react";
// import "antd/dist/antd.css";

import "./styles.scss";
import Chart from "../components/chart/Chart.jsx";
import FeaturedInfo from "../components/featuredInfo/FeaturedInfo";
import WidgetLg from "../components/widgetLg/WidgetLg.jsx";
import WidgetSm from "../components/widgetSm/WidgetSm.jsx";
import { AuthContext } from "../../../context/auth";
import useHttpClient from "../../../hooks/useHttpClient";

const AdminDashboard = () => {
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

  const [loadedPostsChart, setLoadedPostsChart] = useState([]);
  useEffect(() => {
    if (loadedPosts.length > 0) {
      const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const dataEnd = [];
      month.forEach((mon) => {
        let dataByMonth = loadedPosts.reduce((total, dt) => {
          let m = new Date(dt.date);
          return month[m.getMonth()] == mon ? total + 1 : total;
        }, 0);
        dataEnd.push({
          name: mon,
          "Post by month": dataByMonth,
        });
        // return totalPost + dataByMonth;
      }, 0);
      setLoadedPostsChart(dataEnd);
    }
  }, [loadedPosts]);

  return (
    <>
      <div className="homePage">
        <FeaturedInfo />
        <Chart
          data={loadedPostsChart}
          grid={true}
          title={"Posts Analytics"}
          dataKey="Post by month"
        />
        {/* <div className="widgets"> */}
        {/* <WidgetSm usersData={usersData} /> */}
        {/* <WidgetLg ordersData={ordersData} /> */}
      </div>
    </>
  );
};

export default AdminDashboard;

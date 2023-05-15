import "./sidebar.scss";

import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebarComponent">
      <div className="wrapper">
        <div className="menu">
          <h3>Dashboard</h3>
          <ul>
            <Link to="/" className="link">
              <li style={{ color: "white" }}>
                <LineStyle className="icon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="menu">
          <h3>Quick Menu</h3>
          <ul>
            <Link to="/users" className="link">
              <li style={{ color: "white" }}>
                <PermIdentity className="icon" />
                Users
              </li>
            </Link>
            <Link to="/posts" className="link">
              <li style={{ color: "white" }}>
                <Storefront className="icon" />
                Posts
              </li>
            </Link>
            <Link to="/companies" className="link">
              <li style={{ color: "white" }}>
                <WorkOutline className="icon" />
                Companies
              </li>
            </Link>
            <Link to="/tags" className="link">
              <li style={{ color: "white" }}>
                <ChatBubbleOutline className="icon" />
                Tags
              </li>
            </Link>
            <Link to="/chat" className="link">
              <li style={{ color: "white" }}>
                <ChatBubbleOutline className="icon" />
                Chat
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

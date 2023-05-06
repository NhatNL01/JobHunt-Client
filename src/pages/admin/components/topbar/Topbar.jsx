import { useContext } from "react";
import "./topbar.scss";
import { AuthContext } from "../../../../context/auth";

const Topbar = () => {
  const { logout, currentUser } = useContext(AuthContext);
  return (
    <div className="topbarComponent">
      <div className="wrapper">
        <div className="left ">
          <b className="font-bold text-xl">JOBHUNT ADMIN</b>
        </div>
        <div className="right">
          <div className="avatar-admin-hover">
            <img
              className="avatar-admin"
              src={currentUser.avatar || "https://i.ibb.co/xG2ygZT/btter.jpg"}
              alt="adminPic"
            />
            <ul className="account-option-list">
              <a onClick={logout}>
                <li>Logout</li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";

function AdminPage({ children }) {
  return (
    <>
      <Topbar />
      <div className="flex" style={{ alignItems: "start" }}>
        <Sidebar />
        {children}
      </div>
    </>
  );
}

export default AdminPage;

import {
  FaHome,
  FaVideo,
  FaIndustry,
  FaBell,
  FaChartLine,
  FaFileAlt,
  FaCog,
  FaUsers
} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">
        <h2>🏭</h2>
        <h3>Assembly Line Dashboard</h3>
      </div>

      <ul>

        <li className="active">
          <FaHome />
          Dashboard
        </li>

        <li>
          <FaVideo />
          Live Feed
        </li>

        <li>
          <FaIndustry />
          Stations
        </li>

        <li>
          <FaBell />
          Alerts
        </li>

        <li>
          <FaChartLine />
          Analytics
        </li>

        <li>
          <FaFileAlt />
          Reports
        </li>

        <li>
          <FaCog />
          Settings
        </li>

        <li>
          <FaUsers />
          Users
        </li>

      </ul>

      <div className="profile">

        <div className="avatar">
          A
        </div>

        <div>

          <h4>Admin User</h4>

          <p>admin@factory.com</p>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;
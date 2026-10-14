import "../styles/header.css";
import { FaBell } from "react-icons/fa";

function Header() {

    const today = new Date();

    return (

        <div className="header">

            <div>

                <h1>Assembly Line Dashboard</h1>

                <p>Deep Learning Powered Machine Vision System</p>

            </div>

            <div className="header-right">

                <div className="date">

                    {today.toLocaleDateString()}

                </div>

                <div className="time">

                    {today.toLocaleTimeString()}

                </div>

                <div className="notification">

                    <FaBell/>

                </div>

            </div>

        </div>

    );
}

export default Header;
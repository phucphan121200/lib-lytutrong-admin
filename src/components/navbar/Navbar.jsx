import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { style } from "@mui/system";

const Navbar = () => {
  const { dispatchDark } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext)
  return (
    <div className="navbar">
      <div className="wrapper">
        {/* <div className="search">
          <input type="text" placeholder="Tìm kiếm..." />
          <SearchOutlinedIcon />
        </div> */}
        <div className="items">
          {/* <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatchDark({ type: "DARK" })}
            />
          </div>
          <div className="item">
            <LightModeOutlinedIcon
              className="icon"
              onClick={() => dispatchDark({ type: "LIGHT" })}
            />
          </div> */}
          
          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div> */}
          {/* <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}
          <div className="item" style={{marginRight: "10px"}}>
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src={user.user.image}
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

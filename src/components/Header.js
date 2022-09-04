import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Header = ({onClick, darkMode}) => {
  return (
    <div className={`header ${darkMode ? 'darkMode' : '' }`}>
      <div className="header-wrapper">
        <h2 className="logo">Where in the world?</h2>
        <div className="switch-mode" onClick={onClick}>
          <DarkModeIcon />
          <h3>Dark mode</h3>
        </div>
      </div>
    </div>
  );
};

export default Header;

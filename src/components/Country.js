import React from "react";

const Country = ({ darkMode, flag, name, population, region, capital, showDetails }) => {

const showDetailsHandler = () => { showDetails(name) }


  return (
    <div className={`country ${darkMode ? "darkMode" : ""}`} onClick={showDetailsHandler}>
      <div className="flag-wrapper">
        <img src={flag} alt={name} />
      </div>

      <div className="details">
        <h3 className="name">{name}</h3>
        <p>
          Population:
          <span className={`value ${darkMode ? "darkMode" : ""}`}>{population}</span>
        </p>
        <p>
          Region:
          <span className={`value ${darkMode ? "darkMode" : ""}`}>{region}</span>
        </p>
        <p>
          Capital:
          <span className={`value ${darkMode ? "darkMode" : ""}`}>{capital}</span>
        </p>
      </div>
    </div>
  );
};

export default Country;

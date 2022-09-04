import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CountryDetails = ({ darkMode, countries, refetch }) => {
  const params = useParams();
  const navigate = useNavigate();
  let name,
    flag,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    maps,
    currencies = [],
    languages = [],
    borders = [];

  countries.forEach(country => {
    if (country.name.common === params.name) {
      name = country.name.common;
      flag = country.flags.png;
      population = country.population;
      region = country.region;
      subregion = country.subregion;
      capital = country.capital;
      maps = country.maps.googleMaps;
      borders = country.borders;

      // country?.currencies?.forEach(currency => {
      //   currencies.push(currency)
      // })
    }
  });

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="country-details">
      <button className={`back ${darkMode ? "darkMode" : ""}`} onClick={goBack}>
        <ArrowBackIcon />
        <p>Back</p>
      </button>

      <div className="country-details-body">
        <div className="img-wrapper">
          <img src={flag} alt="" />
        </div>

        <div className="info">
          <h2>{name}</h2>
          <div className="info-wrapper">
            <div className="left-info">
              <p>
                Native name:
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  Test
                </span>
              </p>
              <p>
                Population:
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  {population}
                </span>
              </p>
              <p>
                Region:
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  {region}
                </span>
              </p>
              <p>
                Sub Region:
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  {subregion}
                </span>
              </p>
            </div>
            <div className="right-info">
              <p>
                Capital:
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  {capital}
                </span>
              </p>
              <p>
                Top-level domain:
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  {topLevelDomain}
                </span>
              </p>
              <p>
                Currencies:
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  {currencies}
                </span>
              </p>
              <p>
                Languages:
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  {languages}
                </span>
              </p>
            </div>
          </div>
          Border Countries:
          {borders?.length ? (
            borders?.map(border => (
              <div
                key={uuidv4()}
                className={`border-country ${darkMode ? "darkMode" : ""}`}
                onClick={() => {
                  refetch();
                  navigate(`/${border}`);
                }}
              >
                <p>{border}</p>
              </div>
            ))
          ) : (
            <div className={`value ${darkMode ? "darkMode" : ""}`}>
              <p>No borders ...</p>
            </div>
          )}
          <div className={`value ${darkMode ? "darkMode" : ""}`}>
            <a
              className="map-button"
              target={"_blank"}
              rel="noreferrer"
              href={maps}
            >
              view on map
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;

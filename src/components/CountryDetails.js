import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";

const CountryDetails = ({ darkMode, countries, refetch }) => {
  const params = useParams();
  const navigate = useNavigate();
  let name,
    nativeName,
    flag,
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
    if (country.alpha3Code === params.countryCode) {
      name = country.name;
      nativeName = country.nativeName;
      flag = country.flags.png;
      population = country.population;
      region = country.region;
      subregion = country.subregion;
      capital = country.capital;
      topLevelDomain = country.topLevelDomain;

      country.currencies?.forEach(currency => {
        currencies.push(currency.name);
      });
      country.languages?.forEach(language => {
        languages.push(language.name);
      });
      country.borders?.forEach(border => {
        borders.push(border);
      });
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
                  {nativeName}
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
                {currencies.map(currency => {
                  if (currencies.indexOf(currency) !== currencies.length - 1) {
                    return (
                      <span
                        key={currency}
                        className={`value ${darkMode ? "darkMode" : ""}`}
                      >
                        {currency}
                      </span>
                    );
                  } else {
                    return (
                      <span
                        key={currency}
                        className={`value ${darkMode ? "darkMode" : ""}`}
                      >
                        {currency}
                      </span>
                    );
                  }
                })}
              </p>
              <p>
                Languages:
                {languages.map(language => {
                  if (languages.indexOf(language) !== languages.length - 1) {
                    return (
                      <span
                        key={language}
                        className={`value ${darkMode ? "darkMode" : ""}`}
                      >
                        {language}
                      </span>
                    );
                  } else {
                    return (
                      <span
                        key={language}
                        className={`value ${darkMode ? "darkMode" : ""}`}
                      >
                        {language}
                      </span>
                    );
                  }
                })}
              </p>
            </div>
          </div>
          Border Countries:
          {borders?.length ? (
            borders?.map(border => (
              <div
                key={border}
                className={`border-country ${darkMode ? "darkMode" : ""}`}
                onClick={() => {
                  refetch();
                  navigate(`/${border}`);
                }}
              >
                {border}
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
              target="_blank"
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

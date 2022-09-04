import { useState, useEffect, useRef } from "react";

import "./App.css";
import Header from "./components/Header";
import Country from "./components/Country";
import CountryDetails from "./components/CountryDetails";

import SearchIcon from "@mui/icons-material/Search";
import { Routes, Route, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [countries, setCountries] = useState([]);

  const effectRan = useRef(false);
  const countriesInputRef = useRef();
  const regionRef = useRef();
  const navigate = useNavigate();

  const noCountries = countries.status || countries.message;

  useEffect(() => {
    if (effectRan.current === false) {
      try {
        fetchCountries();
      } catch (error) {
        console.log(error);
      }
      return () => {
        console.log("umounted");
        effectRan.current = true;
      };
    }
  }, []);

  const switchMode = () => {
    setDarkMode(prevState => !prevState);
  };

  const fetchCountries = async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    console.log(data);

    if (data.status === 404) {
      setCountries([]);
      return;
    }

    setCountries(data);
  };

  const searchCountries = () => {
    const searchValue = countriesInputRef.current.value;

    if (searchValue.trim()) {
      const fetchSearch = async () => {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${searchValue}`
        );
        const data = await res.json();

        setCountries(data);
      };

      try {
        fetchSearch();
      } catch (error) {
        console.log(error);
      }
    } else {
      fetchCountries();
    }
  };

  const selectRegion = () => {
    const selectValue = regionRef.current.value;

    if (selectValue.trim()) {
      const fetchSelect = async () => {
        const res = await fetch(
          `https://restcountries.com/v3.1/region/${selectValue}`
        );
        const data = await res.json();

        if (selectValue === "All") {
          try {
            fetchCountries();
          } catch (error) {
            console.log(error);
          }
          return;
        }

        setCountries(data);
      };

      try {
        fetchSelect();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showDetails = name => {
    navigate(`/${name}`);
  };

  return (
    <div className={`app ${darkMode ? "darkMode" : ""}`}>
      <Header onClick={switchMode} darkMode={darkMode} />
      <Routes>
        <Route
          path="/"
          element={
            <section className="app-body">
              <div className="inputs">
                <div className={`search-input ${darkMode ? "darkMode" : ""}`}>
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search countries"
                    ref={countriesInputRef}
                    onChange={searchCountries}
                  />
                </div>
                <div className={`select-region ${darkMode ? "darkMode" : ""}`}>
                  <select name="" id="" ref={regionRef} onChange={selectRegion}>
                    <option value="All">All</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                  </select>
                </div>
              </div>

              <article className="countries">
                {!noCountries ? (
                  countries.map(country => {
                    const {
                      name,
                      population,
                      region,
                      capital,
                      flags: { png }
                    } = country;
                    return (
                      <Country
                        key={uuidv4()}
                        darkMode={darkMode}
                        flag={png}
                        name={name.common}
                        population={population}
                        region={region}
                        capital={capital}
                        showDetails={showDetails}
                      />
                    );
                  })
                ) : (
                  <h2>No country found</h2>
                )}
              </article>
            </section>
          }
        />
        <Route
          path="/:name"
          element={
            <CountryDetails
              darkMode={darkMode}
              countries={countries}
              refetch={fetchCountries}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

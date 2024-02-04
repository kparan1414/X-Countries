import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  // Search feature
  const searchCountry = (text) => {
    if (text) {
      let arr = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(text.toLowerCase());
      });
      setCountries(arr);
    }
  };

  const fetchCountries = async () => {
    try {
      let res = await axios.get("https://restcountries.com/v3.1/all");
      console.log(res);
      let data = res.data;
      setCountries(data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    // we can also use "useState" to make a debounce timer like hsown below
    // if (debounceTimer !== 0) clearTimeout(debounceTimer);
    // let newTimer = setTimeout(() => {
    //   fetchVids(search);
    // }, 500);
    // setDebounceTimer(newTimer);

    if (!search) {
      fetchCountries();
    }

    let intervalId;
    intervalId = setTimeout(() => {
      searchCountry(search);
    }, 500);

    return () => {
      clearTimeout(intervalId);
    };
  }, [search]);

  // Style Objects
  const wrapper = {
    display: "flex",
    flexWrap: "wrap",
    padding: "5px",
    justifyContent: "center",
    alignItems: "center",
  };

  const image = {
    width: "100px",
    height: "100px",
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search for countries"
        style={{ width: "300px" }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div style={wrapper}>
        {countries.map((country) => (
          <div className="countryCard" key={country.name.common}>
            <img
              style={image}
              src={country.flags.png}
              alt={country.flags.alt}
            />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

// Using Inline style objects instead of module level css

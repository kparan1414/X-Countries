import { useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);

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

  // Style Objects
  const wrapper = {
    display: "flex",
    flexWrap: "wrap",
    padding: "5px",
    justifyContent: "center",
    alignItems: "center",
  };

  const flag = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const image = {
    width: "100px",
    height: "100px",
  };

  return (
    <div style={wrapper}>
      {countries.map((country) => (
        <div style={flag} key={country.name.common}>
          <img style={image} src={country.flags.png} alt={country.flags.alt} />
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;

// Using Inline style objects instead of module level css

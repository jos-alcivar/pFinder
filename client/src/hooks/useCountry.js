// useCountry.js
import { useState, useEffect } from "react";

export function useCountry() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function loadCountries() {
      const response = await fetch("http://localhost:3000/countries");
      const data = await response.json();
      const countriesList = data.map((country) => country.country_name);
      setCountries(countriesList);
    }
    loadCountries();
  }, []);

  return [countries, setCountries];
}

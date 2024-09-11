// useCountry.js
import { useState, useEffect } from "react";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export function useCountry() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function loadCountries() {
      const response = await fetch(`${apiBaseUrl}/countries`);
      const data = await response.json();
      const countriesList = data.map((country) => country.country_name);
      setCountries(countriesList);
    }
    loadCountries();
  }, []);

  return [countries, setCountries];
}

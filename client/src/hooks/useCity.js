// useCity.js
import { useState, useEffect } from "react";

export function useCity() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function loadCities() {
      const response = await fetch("http://localhost:3000/cities");
      const data = await response.json();
      const citiesList = data.map((city) => city.city_name);
      setCities(citiesList);
    }
    loadCities();
  }, []);

  return [cities, setCities];
}

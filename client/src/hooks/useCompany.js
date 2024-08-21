// useCompany.js
import { useState, useEffect } from "react";

export function useCompany() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function loadCompanies() {
      const response = await fetch("http://localhost:3000/companies");
      const data = await response.json();
      const companiesList = data.map((company) => company.country_name);
      setCompanies(companiesList);
    }
    loadCompanies();
  }, []);

  return [companies, setCompanies];
}

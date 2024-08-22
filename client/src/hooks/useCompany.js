// useCompany.js
import { useState } from "react";

export function useCompany() {
  const [companies, setCompanies] = useState([]);

  return [companies, setCompanies];
}

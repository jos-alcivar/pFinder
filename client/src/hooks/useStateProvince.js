// useStateProvince.js
import { useState } from "react";

export function useStateProvince() {
  const [provinces, setProvinces] = useState([]);

  return [provinces, setProvinces];
}

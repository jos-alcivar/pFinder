// useCity.js
import { useState } from "react";

export function useCity() {
  const [cities, setCities] = useState([]);

  return [cities, setCities];
}

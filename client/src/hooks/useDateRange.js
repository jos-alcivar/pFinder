// useDateRange.js
import { useState } from "react";

export function useDateRange() {
  const labels = ["1D", "2D", "3D", "4D", "ALL"];
  const [dateRange, setDateRange] = useState(() =>
    labels.map((label) => ({
      label,
      status: "default",
    }))
  );

  return [dateRange, setDateRange];
}

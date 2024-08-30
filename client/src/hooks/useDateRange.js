// useDateRange.js
import { useState } from "react";

export function useDateRange() {
  const labels = ["60", "62", "64", "66", "ALL"];
  const [dateRange, setDateRange] = useState(() =>
    labels.map((label) => ({
      label,
      status: "default",
    }))
  );

  return [dateRange, setDateRange];
}

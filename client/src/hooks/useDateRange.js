// useDateRange.js
import { useState } from "react";

export function useDateRange() {
  const labels = ["1W", "1M", "3M", "1Y", "ALL"];
  const [dateRange, setDateRange] = useState(() =>
    labels.map((label) => ({
      label,
      status: "default",
    }))
  );

  return [dateRange, setDateRange];
}

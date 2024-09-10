// useDateRange.js
import { useState } from "react";

export function useDateRange() {
  const labels = ["1W", "1M", "2M", "3M", "ALL"];
  const [dateRange, setDateRange] = useState(() =>
    labels.map((label) => ({
      label,
      status: "default",
    }))
  );

  return [dateRange, setDateRange];
}

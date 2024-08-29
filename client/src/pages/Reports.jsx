/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { useJobPost } from "../hooks/useJobPost";
import { useDateRange } from "../hooks/useDateRange";
import { useFilterOptions } from "../hooks/useFilterOptions";
import { SplineAreaChart } from "../components/SplineAreaChart";
import { DateRangeOptions } from "../forms/DateOptions";
import { FilterOptions } from "../forms/FilterOptions";
import Header from "../layout/Header";
import TabBar from "../layout/TapBar";
import "./Reports.css";
import "./style.css";

function Reports() {
  // State to store dropdown data
  const [dropdownData, setDropdownData] = useState({});
  const [filterOptions, setFilterOptions] = useFilterOptions();

  const handleDropdownDataChange = (data) => {
    setDropdownData((prevData) => ({
      ...prevData,
      [data.label]: data.selectedOptions,
    }));
  };

  const [jobPost] = useJobPost();
  const [dateRange, setDateRange] = useDateRange();
  const dateList = jobPost.map((post) => post.date);
  const dateCounts = dateList.reduce((acc, date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    acc[formattedDate] = (acc[formattedDate] || 0) + 1;
    return acc;
  }, {});
  const resultArray = Object.keys(dateCounts)
    .map((date) => ({
      date,
      oppenings: dateCounts[date],
    }))
    .reverse();

  return (
    <div className="app-ctn">
      <Header title={"Reports"} />
      <div className="body-ctn">
        <div className="content-ctn">
          <div className="filter">
            <FilterOptions
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
              onDropdownDataChange={handleDropdownDataChange} // Pass the callback
            />
            <div className="stats-ctn">
              <div className="graphics">
                <SplineAreaChart data={resultArray} dataKey={"oppenings"} />
                <DateRangeOptions
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <TabBar reports={"selected"} />
    </div>
  );
}

export default Reports;

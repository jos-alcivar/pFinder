/* eslint-disable react/no-unknown-property */
import { useState, useEffect, useCallback } from "react";
import { useDateRange } from "../hooks/useDateRange";
import { useFilterOptions } from "../hooks/useFilterOptions";
import { applyFilter } from "../utils/filterbar.helpers";
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
  const [dateRange, setDateRange] = useDateRange(); // Manage date range state
  const [postList, setPostList] = useState([]);

  // Function to load posts
  const loadPosts = useCallback(async () => {
    const result = await applyFilter(dropdownData);
    setPostList(result);
  }, [dropdownData]);

  // Handle changes in dropdown data
  const handleDropdownDataChange = (data) => {
    setDropdownData((prevData) => ({
      ...prevData,
      [data.label]: data.selectedOptions,
    }));
  };

  // Log the selected OptionCircle and trigger loading posts
  useEffect(() => {
    const selectedOption = dateRange.find(
      (option) => option.type === "selected"
    );
    if (selectedOption) {
      setDropdownData((prevData) => ({
        ...prevData,
        dateIndex: selectedOption.id || dateRange.indexOf(selectedOption),
      }));
    }
  }, [dateRange]); // Only depend on dateRange

  // Load posts when dropdownData or dateRange changes
  useEffect(() => {
    loadPosts();
  }, [dropdownData, loadPosts]); // Depend on dropdownData and loadPosts

  // Process dates for chart
  const dateList = postList.map((post) => post.date);
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
              onDropdownDataChange={handleDropdownDataChange}
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

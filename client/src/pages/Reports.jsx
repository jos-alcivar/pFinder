/* eslint-disable react/no-unknown-property */
import { useState, useEffect, useCallback } from "react";
import { useDateRange } from "../hooks/useDateRange";
import { useFilterOptions } from "../hooks/useFilterOptions";
import { applyFilter } from "../utils/filterbar.helpers";
import { SplineAreaChart } from "../components/SplineAreaChart";
import { CardTopScore } from "../components/CardTopScore";
import { DateRangeOptions } from "../forms/DateOptions";
import { FilterOptions } from "../forms/FilterOptions";
import Header from "../layout/Header";
import TabBar from "../layout/TapBar";
import "./style.css";
import "./Reports.css";

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

  function topScore(postList, filter) {
    if (!Array.isArray(postList) || typeof filter !== "string") {
      throw new Error("Invalid arguments");
    }

    // GET THE TOP 4 ENTRIES
    const filterList = postList.map((post) => post[filter]);
    const filterCounts = filterList.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});

    const filterArray = Object.keys(filterCounts).map((filterValue) => ({
      item: filterValue,
      value: filterCounts[filterValue],
    }));

    const sortedArray = filterArray
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);
    return sortedArray;
  }

  const cardData = {
    topLocation: topScore(postList, "country_name"),
    topJobTitle: topScore(postList, "jobtitle_name"),
    topCompany: topScore(postList, "company_name"),
    topExperience: topScore(postList, "experience"),
    topModel: topScore(postList, "model"),
  };

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

  const dateArray = Object.keys(dateCounts)
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
                <SplineAreaChart data={dateArray} dataKey={"oppenings"} />
                <DateRangeOptions
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              </div>
            </div>
          </div>
          <div className="cards-ctn">
            <CardTopScore
              label="Top Locations"
              filter="Location"
              data={cardData.topLocation}
            />
            <CardTopScore
              label="Top Job Titles"
              filter="Job Title"
              data={cardData.topJobTitle}
            />
            <CardTopScore
              label="Top Companies"
              filter="Company"
              data={cardData.topCompany}
            />
            <CardTopScore
              label="Top Experience"
              filter="Experience Level"
              data={cardData.topExperience}
            />
            <CardTopScore
              label="Top Work Model"
              filter="Work Model"
              data={cardData.topModel}
            />
          </div>
        </div>
      </div>

      <TabBar reports={"selected"} />
    </div>
  );
}

export default Reports;

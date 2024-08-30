import { useState, useEffect, useCallback } from "react";
import { useFilterOptions } from "../hooks/useFilterOptions";
import { applyFilter } from "../utils/filterbar.helpers";
import { CardPost } from "../components/CardPost";
import { FilterOptions } from "../forms/FilterOptions";
import Header from "../layout/Header";
import TabBar from "../layout/TapBar";
import "./style.css";
import "./Jobs.css";

function Jobs() {
  const [dropdownData, setDropdownData] = useState({});
  const [filterOptions, setFilterOptions] = useFilterOptions();
  const [postList, setPostList] = useState([]);

  const loadPosts = useCallback(async () => {
    try {
      const result = await applyFilter(dropdownData);
      setPostList(result || []);
    } catch (error) {
      console.error("Failed to load posts:", error);
      setPostList([]); // Clear or set to an empty array on error
    }
  }, [dropdownData]);

  const handleDropdownDataChange = (data) => {
    setDropdownData((prevData) => ({
      ...prevData,
      [data.label]: data.selectedOptions,
    }));
  };

  useEffect(() => {
    loadPosts();
  }, [dropdownData, loadPosts]);

  return (
    <div className="app-ctn">
      <Header title={"Job Listing"} />
      <div className="body-ctn">
        <div className="content-ctn">
          <div className="filter">
            <FilterOptions
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
              onDropdownDataChange={handleDropdownDataChange}
            />
            <div className="posts">
              {postList.length === 0 ? (
                <p>No posts available</p>
              ) : (
                postList.map((card, index) => (
                  <CardPost
                    className="post-card"
                    key={card.id || index} // Ensure unique key
                    heading={card.jobtitle_name || "N/A"}
                    label={card.company_name || "N/A"}
                    location={`${card.city_name || "N/A"}, ${
                      card.country_name || "N/A"
                    }`}
                    model={card.model?.join(", ") || "N/A"}
                    experience={card.experience?.join(", ") || "N/A"}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <TabBar jobs={"selected"} />
    </div>
  );
}

export default Jobs;

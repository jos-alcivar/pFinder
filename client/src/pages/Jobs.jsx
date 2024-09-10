import { useState, useEffect, useCallback } from "react";
import { useFilterOptions } from "../hooks/useFilterOptions";
import { applyFilter } from "../utils/filterbar.helpers";
import { CardPostB } from "../components/CardPostB";
import { FilterOptions } from "../forms/FilterOptions";
import Header from "../layout/Header";
import TapBar from "../layout/TapBar";
import "./Jobs.css";

function Jobs() {
  const [dropdownData, setDropdownData] = useState({});
  const [filterOptions, setFilterOptions] = useFilterOptions();
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(postList.length / itemsPerPage);

  const loadPosts = useCallback(async () => {
    try {
      const result = await applyFilter(dropdownData);
      setPostList(result || []);
      setCurrentPage(1); // Reset to the first page when new posts are loaded
    } catch (error) {
      console.error("Failed to load posts:", error);
      setPostList([]);
      setCurrentPage(1); // Reset to the first page on error
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const paginatedPosts = postList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              {paginatedPosts.length === 0 ? (
                <p>No posts available</p>
              ) : (
                paginatedPosts.map((card, index) => (
                  <CardPostB
                    className="post-card"
                    key={card.id || index} // Ensure unique key
                    heading={card.jobtitle_name || "N/A"}
                    label={card.company_name || "N/A"}
                    location={`${card.city_name || "N/A"}, ${
                      card.country_name || "N/A"
                    }`}
                    model={card.model?.join(", ") || "N/A"}
                    experience={card.experience?.join(", ") || "N/A"}
                    date={card.date || "N/A"}
                    contact={card.contact}
                  />
                ))
              )}
              <div className="pagination">
                <button
                  className="navigation-btn"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="navigation-btn"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TapBar jobs={"selected"} />
    </div>
  );
}

export default Jobs;

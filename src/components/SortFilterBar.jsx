import { useState } from "react";
import { FilteringTag } from "./FilteringTag";
import { SortMethod } from "./SortMethod";

import "../styles/sortBar.css";

const sortList = ["None", "Title", "Date"];

export function SortFilterBar({
  onSortChange,
  onOrderChange,
  onFilterChange,
  currPage,
  firstPage,
  lastPage,
  changePage,
  tagList,
}) {
  const [selectedSort, setSelectedSort] = useState("");
  const [sortOrder, setSortOrder] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // sort method
  const handleSortChange = (event) => {
    const selectedSortValue = event.target.value;
    setSelectedSort(selectedSortValue);
    onSortChange(selectedSortValue);
  };
  // sort order
  const handleOrderChange = (event) => {
    const sortOrderValue = event.target.checked;
    setSortOrder(sortOrderValue);
    onOrderChange(sortOrderValue);
  };
  // filter tag list
  const handleFilterChange = (event) => {
    const selectedFilterValue = event.target.value;
    const isFilterSelected = selectedFilters.includes(selectedFilterValue);

    if (isFilterSelected) {
      const updatedFilters = selectedFilters.filter(
        (filter) => filter !== selectedFilterValue
      );
      setSelectedFilters(updatedFilters);
      onFilterChange(updatedFilters);
    } else {
      let newFilters = [...selectedFilters, selectedFilterValue];
      setSelectedFilters(newFilters);
      onFilterChange(newFilters);
    }
  };

  return (
    <>
      <div className="thing-opt-bar">
        <a
          className="thing-opt-item button arrow"
          onClick={() => changePage(currPage - 1)}>
          {!firstPage && firstPage ^ lastPage && "< last page"}
        </a>
        <nav className="thing-opt-bar">
          {/* sort method */}
          <div className="thing-opt-item">
            <p className="dropdown-label">Sort By:</p>
            <div
              className="dropdown-box"
              onClick={() => {
                var dropdownList = document.getElementById("sort-dropdown");
                dropdownList.classList.toggle("show");
              }}>
              {selectedSort || "None"} &nbsp; v
              <ul className="dropdown-list" id="sort-dropdown">
                {sortList.map((sort, index) => {
                  return (
                    <SortMethod
                      key={index + 100}
                      methodName={sort}
                      selectedSort={selectedSort}
                      handleSortChange={handleSortChange}
                    />
                  );
                })}
              </ul>
            </div>
          </div>

          {/* sort order */}
          <div className="thing-opt-item">
            <input
              type="checkbox"
              id="orderCheckbox"
              checked={sortOrder}
              onChange={(e) => handleOrderChange(e)}
            />
            <p>ascending order</p>
          </div>
          {/* filter list */}
          <div className="thing-opt-item">
            <p className="dropdown-label">Filter By:</p>
            <div
              className="dropdown-box"
              onClick={() => {
                var dropdownList = document.getElementById("tag-dropdown");
                dropdownList.classList.toggle("show");
              }}>
              Selected ({selectedFilters.length}) &nbsp; v
              <ul className="dropdown-list" id="tag-dropdown">
                {tagList &&
                  tagList.map((tag, index) => {
                    return (
                      <FilteringTag
                        key={index + 1000}
                        tag={tag}
                        selectedFilters={selectedFilters}
                        handleFilterChange={handleFilterChange}
                      />
                    );
                  })}
              </ul>
            </div>
          </div>
        </nav>
        <a
          className="thing-opt-item button arrow"
          onClick={() => changePage(currPage + 1)}>
          {!lastPage && firstPage ^ lastPage && "next page >"}
        </a>
      </div>
    </>
  );
}

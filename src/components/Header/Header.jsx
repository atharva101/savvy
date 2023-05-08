import React from "react";
import SearchBox from "./components/SearchBox";

const Header = ({ setSearchQuery, setFilteredPosts, filteredPosts }) => {
  const sortByTitle = (e) => {
    if (e.target.value === "title") {
      const sortedPosts = [...filteredPosts].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setFilteredPosts(sortedPosts);
    }
    //no date key value pair in resoponse to sort by date.
  };

  return (
    <React.Fragment>
      <SearchBox setSearchQuery={setSearchQuery} />
      <label htmlFor="sort" style={{ padding: "20px" }}>
        Sort By:
      </label>
      <select name="sort" id="sort-by" onChange={(e) => sortByTitle(e)}>
        <option value="date">Date</option>
        <option value="title">Title</option>
      </select>
    </React.Fragment>
  );
};

export default Header;

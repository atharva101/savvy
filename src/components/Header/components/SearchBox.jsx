import "./SearchBox.styles.css";

const SearchBox = ({ setSearchQuery }) => {
  const handleSearch = (e) => {
    // console.log(e.target.value);
    setSearchQuery(e.target.value);
  };
  return (
    <input
      style={{
        margin: "20px 20px",
      }}
      className="search"
      type="text"
      placeholder="search"
      onChange={(e) => handleSearch(e)}
    />
  );
};

export default SearchBox;

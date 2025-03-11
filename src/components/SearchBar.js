const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search products..."
      className="border p-2 rounded w-64"
    />
  );
};

export default SearchBar;

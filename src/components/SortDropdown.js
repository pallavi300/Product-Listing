const SortDropdown = ({ sortOrder, onSort }) => {
  return (
    <select
      onChange={(e) => onSort(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="">Sort by Price</option>
      <option value="low-to-high">Low to High</option>
      <option value="high-to-low">High to Low</option>
    </select>
  );
};

export default SortDropdown;

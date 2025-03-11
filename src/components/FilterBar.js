const FilterBar = ({ categories, onFilter }) => {
  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      className="border p-2 rounded"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default FilterBar;

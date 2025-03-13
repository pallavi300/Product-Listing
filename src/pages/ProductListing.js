import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        const uniqueCategories = [
          "All",
          ...new Set(res.data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setFilteredProducts(
      products
        .filter(
          (p) => selectedCategory === "All" || p.category === selectedCategory
        )
        .filter((p) => p.title.toLowerCase().includes(term.toLowerCase()))
    );
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedProducts = [...filteredProducts].sort((a, b) =>
      order === "low-to-high" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <FilterBar categories={categories} onFilter={handleFilter} />
        <SortDropdown sortOrder={sortOrder} onSort={handleSort} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;

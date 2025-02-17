import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Home() {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortType, setSortType] = useState("price");
    const [searchTerm, setSearchTerm] = useState("");
    const { addToCart } = useContext(CartContext);

    // Fetch products
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch products");
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setOriginalProducts(data);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    // Fetch product categories
    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
            .then((res) => res.json())
            .then((data) => setCategories(["all", ...data])) // Add "all" to show all products
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    // Filter products based on category
    const filteredProducts = products.filter((product) =>
        (selectedCategory === "all" || product.category === selectedCategory) &&
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle sorting
    const handleSort = () => {
        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (sortType === "price") {
                return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
            } else {
                return sortOrder === "asc"
                    ? a.category.localeCompare(b.category)
                    : b.category.localeCompare(a.category);
            }
        });

        setProducts(sortedProducts);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    if (loading) return <div className="loader"></div>;
    if (error) return <p>Error loading products. Please try again.</p>;

    return (
        <div>
            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Products..."
                    className="search-bar"
                />
            </div>

            {/* Category Dropdown */}
            <div>
                <label htmlFor="category">Filter by Category: </label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sorting Buttons */}
            <button onClick={handleSort}>
                Sort by {sortType === "price" ? "Price" : "Category"} ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
            <button onClick={() => setSortType(sortType === "price" ? "category" : "price")}>
                Switch Sorting Type
            </button>
            <button onClick={() => setProducts(originalProducts)}>Reset Sorting</button>

            <h1>Product List</h1>

            {/* Product Grid */}
            <div className="product-list">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <h2>{product.title}</h2>
                        <p>Category: {product.category}</p>
                        <img src={product.image} alt={product.title} width="100" />
                        <p>Price: ${product.price}</p>
                        <Link to={`/product/${product.id}`}>View Details</Link>
                        <button onClick={() => addToCart(product)}>Add to cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;

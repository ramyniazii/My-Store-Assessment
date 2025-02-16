import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Home() {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sortOrder, setSortOrder] = useState("asc");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [searchTerm, setSearchTerm] = useState("");
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const { addToCart } = useContext(CartContext);
    const handleSort = () => {
        const sortedProducts = [...products].sort((a, b) =>
            sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );
        setProducts(sortedProducts);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };
    


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

    if (loading) return <div className="loader"></div>;
    if (error) return <p>Error loading products. Please try again</p>;

    return (
        <div>
            <button onClick={handleSort}>
               Sort by Price ({sortOrder === "asc" ? "Lowest to Highest" : "Highest to Lowest"})
            </button>
            <button onClick={() => setProducts(originalProducts)}>Reset Sorting</button>
            <h1>Product List</h1>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Products..."/>
            <div>
                {filteredProducts.map(product => (
                    <div key={product.id}>
                        <h2>{product.title}</h2>
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

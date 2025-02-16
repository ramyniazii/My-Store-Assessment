import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch products");
                return res.json();
            })
            .then(setProducts)
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
            <h1>Product List</h1>
            <div>
                {products.map(product => (
                    <div key={product.id}>
                        <h2>{product.title}</h2>
                        <img src={product.image} alt={product.title} width="100" />
                        <p>Price: ${product.price}</p>
                        <Link to={`/product/${product.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;

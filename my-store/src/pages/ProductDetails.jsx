import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch product details");
                return res.json();
            })
            .then((data) => {
                if (Object.keys(data).length === 0) {
                    setError(true);
                } else {
                    setProduct(data);
                }    
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="loader"></div>;
    if (error || !product) return <p>Product not found.</p>;

    return (
        <div>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} width="200" />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default ProductDetails;

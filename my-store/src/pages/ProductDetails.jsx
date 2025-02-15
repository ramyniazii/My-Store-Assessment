import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(() => alert("Error loading product details"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} width="200" />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
}

export default ProductDetails;
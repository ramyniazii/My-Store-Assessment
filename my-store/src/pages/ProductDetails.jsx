import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

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

    const cartItem = cart.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <div>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} width="200" />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>

            <div>
                {quantity > 0 ? (
                    <div>
                        <button onClick={() => removeFromCart(product.id)}>-</button>
                        <span> {quantity} </span>
                        <button onClick={() => addToCart(product)}>+</button>
                    </div>
                ) : (
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                )}
            </div>

            <br />
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default ProductDetails;
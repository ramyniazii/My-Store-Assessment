import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
          .then((res) => res.json())
          .then((data) => setProduct(data))
          .catch((err) => console.error("Error fetching products:", err));
    }, [id]);

    if (!product) return <h2>Loading...</h2>;

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
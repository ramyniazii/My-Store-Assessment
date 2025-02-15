import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
         .then((res) => res.json())
         .then((data) => setProducts(data))
         .catch((err) => console.error("Error fetching products:", err))
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <div>
                {products.map((product) => (
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
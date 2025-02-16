import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id}>
                            <h2>{item.title}</h2>
                            <img src={item.image} alt={item.title} width="100" />
                            <p>Price: ${item.price}</p>
                            
                            <div>
                                <button onClick={() => removeFromCart(item.id)}>-</button>
                                <span> {item.quantity} </span>
                                <button onClick={() => addToCart(item)}>+</button>
                            </div>

                            <p>Subtotal: ${item.price * item.quantity}</p>
                        </div>
                    ))}

                    <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
                </div>
            )}
            
            <br />
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default Cart;

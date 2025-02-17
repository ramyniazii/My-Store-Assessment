import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
    const { cart } = useContext(CartContext);
    
    return (
        <nav className="navbar">
            <div className="nav-left">
                <h1>My Store</h1>
            </div>
            <div className="nav-center">
                    <Link to="/">Home</Link>
            </div>
            <div className="nav-right">
                <Link to="/cart" className="cart-button">
                    <span className="cart-icon">🛒</span> Cart ({cart.length})
                </Link>
            </div>
            <div classname="">
                <Link to="/create-product">Create Product</Link>
            </div>
        </nav>
    );
}

export default Navbar;

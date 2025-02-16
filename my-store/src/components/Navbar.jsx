import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
    const { cart } = useContext(CartContext);
    
    return (
        <nav>
            <h1>My Store</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <Link to="/cart">Cart ({cart.length})</Link>
            </ul>
        </nav>
    );
}

export default Navbar;
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h1>My Store</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
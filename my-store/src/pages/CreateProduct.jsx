import { useState, useEffect } from "react";

function CreateProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [categories, setCategories] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !price || !category || !image) {
            alert("All fields are required.");
            return;
        }

        if (price <= 0) {
            alert("Price must be a positive number.");
            return;
        }

        const newProduct = {
            title,
            description,
            price: parseFloat(price),
            category,
            image,
        };

        try {
            const res = await fetch("https://fakestoreapi.com/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                throw new Error("Failed to create product");
            }

            setSuccessMessage("Product created successfully!");
            setTitle("");
            setDescription("");
            setPrice("");
            setCategory("");
            setImage("");
        } catch (error) {
            console.error("Error:", error);
            alert("Error creating product. Try again.");
        }
    };

    return (
        <div>
            <h2>Create New Product</h2>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
}

export default CreateProduct;

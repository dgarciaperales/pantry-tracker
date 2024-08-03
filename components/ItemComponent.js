import { useState, useEffect } from "react";
import { addItem, fetchItems } from "../app/services/firestoreService";

export default function ItemComponent() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserItems = async () => {
            try {
                const fetchedItems = await fetchItems();
                setItems(fetchedItems);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserItems();
    }, []);

    const handleAddItem = async() => {
        try {
            await addItem({ name: newItem });
            setNewItem('');
            const fetchedItems = await fetchItems();
            setItems(fetchedItems);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>User Items</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="New Item"
                className="mb-2 p-2 border"
                style={{ color:'black' }}
            />
            <button onClick={handleAddItem} className="p-2 bg-gray-500 text-white">
                Add Item
            </button>
            <ul>
                {items.map((item) => {
                    <li key = {item.id}>{item.name}</li>
                })}
            </ul>
        </div>
    );
}
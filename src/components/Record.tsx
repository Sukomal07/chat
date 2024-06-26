"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import axios from "axios";

interface Item {
    [key: string]: string | number;
}

export default function Record() {
    const [items, setItems] = useState<Item[]>([]);
    const [editItemId, setEditItemId] = useState<string | null>(null); // Track which item is being edited
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://pybarker-fastapi.onrender.com/items");
                setItems(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [refresh]);

    const handleView = (id: string) => {
        console.log("View", id);
    };

    const handleEdit = (id: string) => {
        console.log("Edit", id);
        setEditItemId(id); // Set the item ID to be edited
    };

    const handleDelete = async (id: string) => {
        try {
            setRefresh(true);
            await axios.delete(`https://pybarker-fastapi.onrender.com/items/${id}`);
            setRefresh(false);
        } catch (error) {
            console.error(`Error deleting item with id ${id}:`, error);
        }
    };

    const handleSaveEdit = async (editedItem: Item) => {
        try {
            const response = await axios.post(`https://pybarker-fastapi.onrender.com/items/${editedItem.id}`, editedItem);
            alert(response.data?.message);
            setEditItemId(null);
            setRefresh(true);
        } catch (error) {
            console.error("Error saving edited item:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditItemId(null);
    };

    return (
        <Card title="Record" description="View, edit, or delete existing records.">
            <div className="overflow-auto">
                {items.map((item) => {
                    const { id, ...displayItem } = item;
                    const isEditing = id === editItemId;

                    return (
                        <table key={id as string}>
                            <thead>
                                <tr>
                                    {Object.keys(displayItem).map((key) => (
                                        <th key={key} className="p-2 border-b border-gray-200">
                                            {key}
                                        </th>
                                    ))}
                                    <th className="p-2 border-b border-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {Object.values(displayItem).map((value, index) => (
                                        <td key={index} className="p-2 border-b border-gray-200">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={value as string}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md  p-2 focus:border-blue-500 outline-none w-full"
                                                    onChange={(e) => {
                                                        const newValue = e.target.value;
                                                        setItems((prevItems) => {
                                                            const updatedItems = [...prevItems];
                                                            updatedItems.find((item) => item.id === id)![Object.keys(displayItem)[index]] = newValue;
                                                            return updatedItems;
                                                        });
                                                    }}
                                                />
                                            ) : (
                                                value
                                            )}
                                        </td>
                                    ))}
                                    <td className="p-2 border-b border-gray-200">
                                        <div className="flex items-center gap-2 h-full">
                                            {isEditing ? (
                                                <>
                                                    <Button onClick={() => handleSaveEdit(item)} btnType="submit" className="bg-black hover:bg-gray-600 text-white text-xl py-2 px-3 rounded-md w-fit">
                                                        Save
                                                    </Button>
                                                    <Button onClick={handleCancelEdit} btnType="button" className="text-black border border-black text-xl py-2 px-3 rounded-md w-fit">
                                                        Cancel
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button onClick={() => handleView(id as string)} btnType="button">
                                                        <EyeIcon />
                                                    </Button>
                                                    <Button onClick={() => handleEdit(id as string)} btnType="button">
                                                        <FilePenIcon />
                                                    </Button>
                                                    <Button onClick={() => handleDelete(id as string)} btnType="button">
                                                        <TrashIcon />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    );
                })}
            </div>
        </Card>
    );
}




function EyeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


function FilePenIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
        </svg>
    )
}


function TrashIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    )
}

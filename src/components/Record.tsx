"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card } from "./ui/card";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import Modal from "./Modal";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";


interface Item {
    [key: string]: string | number;
}

interface RecordProps {
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function Record({ refresh, setRefresh }: RecordProps) {
    const [items, setItems] = useState<Item[]>([]);
    const [editItemId, setEditItemId] = useState<string | null>(null);
    const [viewItem, setViewItem] = useState<Item | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/items");
                setItems(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [refresh]);

    const handleView = (item: Item) => {
        setViewItem(item);
    };

    const handleEdit = (id: string) => {
        setEditItemId(id);
    };

    const handleDelete = async (id: string) => {
        const loadingToastId = toast.loading("Deleting...");
        try {
            setRefresh(true);
            const response = await axios.delete(`http://localhost:8080/items/${id}`);
            toast.success(response.data?.message || "Item deleted successfully", { id: loadingToastId });
            setRefresh(false);
        } catch (error) {
            toast.error(`Error deleting item with id ${id}`, { id: loadingToastId });
            console.error(`Error deleting item with id ${id}:, error`);
        }
    };

    const handleSaveEdit = async (editedItem: Item) => {
        try {
            setSaving(true)
            const response = await axios.post(`http://localhost:8080/items/${editedItem.id}`, editedItem);
            alert(response.data?.message);
            setEditItemId(null);
            setRefresh(true);
            setSaving(false)
        } catch (error) {
            setSaving(false)
            console.error("Error saving edited item:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditItemId(null);
    };

    const closeModal = () => {
        setViewItem(null);
    };

    return (
        <Card title="Record" description="View, edit, or delete existing records.">
            <Table>
                <TableBody>
                    {items.map((item) => {
                        const { id, ...displayItem } = item;
                        const isEditing = id === editItemId;

                        return (
                            <TableRow key={id as string}>
                                {Object.values(displayItem).map((value, index) => (
                                    <TableCell key={index}>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={value as string}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md p-2 focus:border-blue-500 outline-none w-full"
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
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <div className="flex items-center gap-2 h-full">
                                        {isEditing ? (
                                            <>
                                                <Button onClick={() => handleSaveEdit(item)} variant="default" disabled={saving}>
                                                    {saving ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Please wait
                                                        </>
                                                    ) : (
                                                        "Save"
                                                    )}
                                                </Button>
                                                <Button onClick={handleCancelEdit} variant="outline" disabled={saving}>
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <div onClick={() => handleView(item)} className="cursor-pointer">
                                                    <EyeIcon />
                                                </div>
                                                <div onClick={() => handleEdit(id as string)} className="cursor-pointer">
                                                    <FilePenIcon />
                                                </div>
                                                <div onClick={() => handleDelete(id as string)} className="cursor-pointer">
                                                    <TrashIcon />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {viewItem && (
                <Modal item={viewItem} onClose={closeModal} />
            )}
        </Card>
    );
}




function EyeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
            width="20"
            height="20"
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
            width="20"
            height="20"
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
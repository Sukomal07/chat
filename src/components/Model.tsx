"use client"

import { useState } from 'react';

interface ModelProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (label: string) => void;
}

export const Model = ({ isOpen, onClose, onSave }: ModelProps) => {
    const [label, setLabel] = useState('');

    const handleSave = () => {
        onSave(label);
        setLabel('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md">
                <h2 className="text-xl mb-4">Enter Label</h2>
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="border p-2 rounded-md w-full"
                />
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={onClose} className="bg-gray-300 p-2 rounded-md">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded-md">Save</button>
                </div>
            </div>
        </div>
    );
};

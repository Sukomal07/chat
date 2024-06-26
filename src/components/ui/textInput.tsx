"use client";

interface TextInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onDelete: () => void;
}

export const TextInput = ({ label, value, onChange, onDelete }: TextInputProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor={label} className="capitalize text-base text-black font-semibold">{label}</label>
            <div className="flex items-center w-full gap-2">
                <input
                    type="text"
                    id={label}
                    name={label}
                    placeholder={`Enter ${label}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md  p-2 focus:border-blue-500 outline-none w-full"
                />
                <button
                    type="button"
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-700"
                >
                    <TrashIcon />
                </button>
            </div>
        </div>
    );
};


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
"use client";

interface TextInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete?: () => void;
    delIcon?: boolean
}

export const TextInput = ({ label, name, value, onChange, onDelete, delIcon }: TextInputProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor={label} className="capitalize text-base text-black font-semibold">{label}</label>
            <div className="flex items-center w-full gap-2">
                <input
                    type="text"
                    id={label}
                    name={name}
                    placeholder={`Enter ${label}`}
                    value={value}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md  p-2 focus:border-blue-500 outline-none w-full"
                />
                {
                    delIcon && (
                        <button
                            type="button"
                            onClick={onDelete}
                            className="text-red-500 hover:text-red-700"
                        >
                            <TrashIcon />
                        </button>
                    )
                }
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
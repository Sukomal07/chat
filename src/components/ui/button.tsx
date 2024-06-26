"use client";

import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    className?: string;
    btnType?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void
}

export const Button = ({ children, className, btnType, disabled, onClick }: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            className={className}
            type={btnType}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

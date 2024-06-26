interface CardProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export const Card = ({ title, description, children }: CardProps): JSX.Element => {
    return (
        <div className="flex flex-col gap-2 h-full border border-slate-300 p-4 rounded-md">
            <div className="flex flex-col gap-2 pb-2">
                <h1 className="text-2xl text-slate-600 font-semibold">{title}</h1>
                <p className="text-sm text-slate-300 font-semibold">{description}</p>
            </div>
            {children}
        </div>
    )
}
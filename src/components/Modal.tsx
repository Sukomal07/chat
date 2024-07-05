import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface ModalProps {
    item: {
        [key: string]: string | number;
    };
    onClose: () => void;
}

const Modal = ({ item, onClose }: ModalProps) => {
    const keysToShow = Object.keys(item).filter(key => key !== 'id');

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-4 max-w-7xl w-full relative">
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {keysToShow.map((key) => (
                                <TableHead key={key} className="capitalize">{key}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            {keysToShow.map((key) => (
                                <TableCell key={key}>{item[key]}</TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
                <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Modal;

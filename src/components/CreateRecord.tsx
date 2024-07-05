"use client"

import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react"
import { Input } from "./ui/input";
import * as XLSX from 'xlsx';
import toast from "react-hot-toast";

interface CreateRecordProps {
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function CreateRecord({ setRefresh }: CreateRecordProps) {
    const [file, setFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const loadingToastId = toast.loading("Uploading...");
        try {
            setSaving(true);
            setRefresh(true);

            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

            const response = await axios.post("http://localhost:8080/items/bulk", jsonData);
            toast.success(response.data?.message || "File upload successfully", { id: loadingToastId });

            setFile(null);
            setSaving(false);
            setRefresh(false);
        } catch (error) {
            toast.error(`Error uploading file`, { id: loadingToastId });
            setSaving(false);
            setRefresh(false);
            console.error("Error uploading file", error);
        }
    };

    return (
        <Card title="Create New Record" description="Add excel file to create record">
            <div className="h-full px-6 flex flex-col gap-6">
                <Input id="excel" type="file" onChange={handleFileChange} />
                <Button variant={'default'} onClick={handleUpload} disabled={saving}>
                    {saving ? <Loader2 className="animate-spin" /> : "Upload"}
                </Button>
            </div>
        </Card>
    );
}

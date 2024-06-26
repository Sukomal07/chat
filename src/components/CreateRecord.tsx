"use client"

import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Card } from "./ui/card";
import { TextInput } from "./ui/textInput";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react"

interface CreateRecordProps {
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function CreateRecord({ setRefresh }: CreateRecordProps) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setRefresh(true)
            const response = await axios.post("https://pybarker-fastapi.onrender.com/items", formData);
            alert(response.data?.message);
            setFormData({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
            });
            setSaving(false);
            setRefresh(false)
        } catch (error) {
            setSaving(false);
            setRefresh(false)
            console.error("Error saving data", error);
        }
    };

    const handleCancel = () => {
        setFormData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
        });
    }

    return (
        <Card title="Create New Record" description="Fill out the form to add a new record">
            <div className="h-full overflow-y-auto">
                <form className="grid md:grid-cols-2 gap-3">
                    <TextInput
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </form>
            </div>
            <div className="mt-5 flex justify-end items-center gap-3">
                <Button onClick={handleCancel} variant="outline" disabled={saving}>
                    Cancel
                </Button>
                <Button onClick={handleSave} variant="default" disabled={saving}>
                    {saving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Save"
                    )}
                </Button>
            </div>
        </Card>
    );
}

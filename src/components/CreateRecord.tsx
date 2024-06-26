"use client"

import { Card } from "./ui/card"
import { TextInput } from "./ui/textInput"
import { Button } from "./ui/button"
import { useState } from "react";
import axios from "axios";

interface Input {
    label: string;
    value: string;
}

export default function CreateRecord() {
    const [inputs, setInputs] = useState<Input[]>([]);

    const handleAddInput = () => {
        const newLabel = `Field ${inputs.length + 1}`;
        setInputs([...inputs, { label: newLabel, value: "" }]);
    };

    const handleChange = (index: number, newValue: string) => {
        const newInputs = [...inputs];
        newInputs[index].value = newValue;
        setInputs(newInputs);
    };

    const handleDelete = (index: number) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs);
    };

    const handleSave = async () => {
        try {
            const transformedData: { [key: string]: string } = inputs.reduce((acc, input) => {
                acc[input.label] = input.value;
                return acc;
            }, {} as { [key: string]: string });

            const response = await axios.post("https://pybarker-fastapi.onrender.com/items", transformedData);
            const clearedInputs = inputs.map(input => ({
                ...input,
                value: ""
            }));
            setInputs(clearedInputs);
            alert(response.data?.message);
        } catch (error) {
            console.error("Error saving data", error);
        }
    };

    return (
        <Card title="Create New Record" description="Fill out the form add a new record">
            <div className="flex justify-end absolute top-6 right-6">
                <Button onClick={handleAddInput} btnType="button" className="bg-black hover:bg-gray-600 text-white text-xl py-2 px-5 rounded-md w-fit">
                    +
                </Button>
            </div>
            <div className="h-full overflow-y-auto">
                <form className="flex flex-col gap-3">
                    {inputs.map((input, index) => (
                        <TextInput
                            key={index}
                            label={input.label}
                            value={input.value}
                            onChange={(value) => handleChange(index, value)}
                            onDelete={() => handleDelete(index)}
                        />
                    ))}
                </form>
            </div>
            <div className="mt-5 flex justify-end">
                {
                    inputs.length !== 0 && (
                        <Button onClick={handleSave} btnType="submit" className="text-white text-base py-2 px-4 rounded-md bg-black hover:bg-gray-700" disabled={inputs.length === 0}>
                            Save
                        </Button>
                    )
                }
            </div>
        </Card>
    )
}

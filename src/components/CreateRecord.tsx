"use client"

import { Card } from "./ui/card"
import { TextInput } from "./ui/textInput"
import { Button } from "./ui/button"
import { Model } from "./Model"
import { useState } from "react";

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

    const handleSave = () => {
        const clearedInputs = inputs.map(input => ({
            ...input,
            value: ""
        }));

        setInputs(clearedInputs);
        console.log("Form saved", inputs);
    };

    console.log(inputs)
    return (
        <Card title="Create New Record" description="Fill out the form add a new record">
            <div className="flex justify-end">
                <Button onClick={handleAddInput} btnType="button" className="bg-black hover:bg-gray-600 text-white text-xl py-2 px-3 rounded-md w-fit">
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
                <Button onClick={handleSave} btnType="submit" className={`text-white text-base py-2 px-4 rounded-md ${inputs.length === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-600'}`} disabled={inputs.length === 0}>
                    Save
                </Button>
            </div>
        </Card>
    )
}

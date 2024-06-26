"use client"

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";

export default function Chat() {
    const [messages, setMessages] = useState([
        { sender: "You", text: "Hello" },
        { sender: "Assistant", text: "Hello! How can I assist you today? I'm happy to help with any questions or tasks you may have." }
    ]);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            setMessages([...messages, { sender: "You", text: newMessage }]);
            setNewMessage("");
        }
    };

    return (
        <Card title="Chat" description="Interact with the assistant">
            <div className="flex flex-col gap-4 h-full relative">
                <div className="h-[90%] overflow-y-auto flex flex-col gap-3">
                    {messages.map((message, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="grid gap-1">
                                <div className="font-bold">{message.sender}</div>
                                <div className="prose text-muted-foreground">
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 mt-4 absolute bottom-2 w-full">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-grow p-2 border rounded-md"
                        placeholder="Type your message..."
                    />
                    <Button onClick={handleSendMessage} className="bg-black hover:bg-gray-600 text-white p-2 rounded-md">
                        <ArrowUpIcon />
                    </Button>
                </div>
            </div>
        </Card>
    );
}

function ArrowUpIcon() {
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
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
        </svg>
    );
}

"use client";

import { ChatCompletionMessageParam } from "ai/prompts";
import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const generateResponse = async ({
  chatHistory,
  userQuery,
  fields,
  updateChatHistory,
}: {
  chatHistory: Array<ChatCompletionMessageParam>;
  updateChatHistory: (aiResponse: string) => void;
  userQuery: string;
  fields: Array<string>;
}) => {
  try {
    console.log({ fields, userQuery, chatHistory });
    const airesponse = await axios.post("/api/chat/openai", {
      chatHistory,
      userQuery,
      fields,
    });
    console.log({ airesponse });
    updateChatHistory(airesponse.data.content);
  } catch (err: any) {
    const message = err?.message ?? "Something Went Wrong!!";
    console.error(err);
    alert(message);
  }
};

const fields = ["firstName", "lastName", "phoneNumber", "email"];

export default function Chat() {
  const [chatHistory, setChatHistory] = useState<
    Array<ChatCompletionMessageParam>
  >(() => []);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        name: "User",
        content: newMessage,
      };
      setChatHistory((prev) => [...prev, userMessage]);
      setNewMessage("");
      console.log({ chatHistory });
      generateResponse({
        chatHistory: chatHistory,
        userQuery: newMessage,
        updateChatHistory: (aiResponse) =>
          setChatHistory((prev) => [
            ...prev,
            { role: "system", content: aiResponse, name: "AI" },
          ]),
        fields,
      });
    }
  };

  return (
    <Card title="Chat" description="Interact with the assistant">
      <div className="flex flex-col gap-4 h-full relative">
        <div className="h-[90%] overflow-y-auto flex flex-col gap-3">
          {chatHistory.map((message, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="grid gap-1">
                <div className="font-bold">
                  {message.role === "system" ? "AI" : "User"}
                </div>
                <div className="prose text-muted-foreground">
                  <p>{(message?.content as string) ?? "NA"}</p>
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
          <Button
            onClick={handleSendMessage}
            className="bg-black hover:bg-gray-600 text-white p-2 rounded-md"
          >
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

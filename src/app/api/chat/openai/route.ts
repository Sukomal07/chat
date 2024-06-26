import { checkApiKey } from "@/lib/server/server-chat-helpers";
import { ChatCompletionMessageParam } from "ai/prompts";
import axios from "axios";
import { ServerRuntime } from "next";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime: ServerRuntime = "edge";

const chatSettings = { model: "gpt-4o", temperature: 0.1 };
const profile = {
  openai_api_key: process.env["openai_api_key"],
};

const SYSTEM_PROMPT = `
You are an intelligent AI assistant.
You are designed to provide full answers to user questions about company in your database by returning all info about the employee.
You are friendly, helpful, and informative and wee bit cheeky.
    - Only answer questions related to the information provided below.
    - Write two lines of whitespace between each answer in the list.
    - If you're unsure of an answer, you can say ""I don't know"" or ""I'm not sure"" and recommend users search themselves."
AI Assistant will only give output in plain text format.
No Notes/Ext/Placeholders/Markdown allowed.
Do not use ** for text formatting.
`;

export async function POST(request: Request) {
  const json = await request.json();
  const { chatHistory, userQuery, fields } = json as {
    chatHistory: any[];
    userQuery: string;
    fields: Array<string>;
  };

  try {
    checkApiKey(profile.openai_api_key, "OpenAI");
    const openai = new OpenAI({
      apiKey: profile.openai_api_key,
    });
    const emebeddingResponse = await axios.post(
      "https://pybarker-fastapi.onrender.com/search",
      {
        query: userQuery,
        fields: fields,
      }
    );
    const userMessage = { role: "user", content: userQuery };
    const emebeddingsResult = emebeddingResponse.data?.["results"];
    const systemMessages =
      emebeddingsResult.length > 0
        ? (emebeddingResponse.data?.["results"] ?? []).map((e: any) => ({
            role: "system",
            content: JSON.stringify(e.document),
          }))
        : [{ role: "system", content: JSON.stringify([]) }];
    const messages: Array<ChatCompletionMessageParam> = [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...chatHistory,
      userMessage,
      ...systemMessages,
    ];

    const result = await openai.chat.completions.create({
      messages: messages,
      model: chatSettings.model,
      temperature: chatSettings.temperature,
    });
    return NextResponse.json({ content: result.choices[0].message.content });
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred";
    const errorCode = error.status || 500;

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "OpenAI API Key not found. Please set it in your profile settings.";
    } else if (errorMessage.toLowerCase().includes("incorrect api key")) {
      errorMessage =
        "OpenAI API Key is incorrect. Please fix it in your profile settings.";
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode,
    });
  }
}

"use client";
import {
  alternateSum,
  convertSentenceToNumber,
  formatExpression,
} from "@/utils/rumus";
import { useState } from "react";
import OutputTable from "./components/output-table";

interface HistoryItem {
  input: string;
  converted: string;
  result: number;
}

export default function Home() {
  const [input, setInput] = useState("Titanic");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const converted = convertSentenceToNumber(input);
    const result = alternateSum(converted);

    setHistory((prev) => [
      ...prev,
      {
        input: formatExpression(converted),
        converted,
        result,
        inputText: input,
      },
    ]);

    console.log(history);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Text to Code Converter + Kalkulasi Bergantian
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-xl"
            placeholder="Tulis kalimat di sini..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Kirim
          </button>
        </form>

        {history.length > 0 && <OutputTable data={history} />}
      </div>
    </div>
  );
}

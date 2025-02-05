"use client";
import { useState } from "react";
import { Button, Card } from "@nextui-org/react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  const backgroundColor = `rgba(0, 100, 255, ${Math.min(count / 10, 1)})`;

  return (
    <Card
      className="p-8 text-center flex flex-col items-center gap-6 shadow-lg border border-gray-300"
      style={{ backgroundColor, borderRadius: "12px" }}
    >
      <h2 className="text-3xl font-bold text-white bg-gray-900 px-6 py-3 rounded-lg shadow-md">
        {count}
      </h2>
      <div className="flex justify-center gap-4 mt-2">
        <Button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </Button>
        <Button
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </Button>
        <Button
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          onClick={() => setCount(0)}
        >
          Reset
        </Button>
      </div>
    </Card>
  );
};

export default Counter;

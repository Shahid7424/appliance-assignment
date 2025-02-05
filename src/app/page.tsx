"use client";
import { useState } from "react";
import Counter from "./components/Counter";
import UserForm from "./components/UserForm";
import RichTextEditor from "./components/RichTextEditor";

export default function Home() {
  const [activePage, setActivePage] = useState("");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">Welcome to Appliance Assignment </h1>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li><button onClick={() => setActivePage("counter")} className="text-blue-500 hover:underline">Counter</button></li>
          <li><button onClick={() => setActivePage("userForm")} className="text-blue-500 hover:underline">User Form</button></li>
          <li><button onClick={() => setActivePage("richText")} className="text-blue-500 hover:underline">Rich Text Editor</button></li>
        </ul>
      </nav>

      <div className="mt-6">
        {activePage === "counter" && <Counter />}
        {activePage === "userForm" && <UserForm />}
        {activePage === "richText" && <RichTextEditor />}
      </div>
    </div>
  );
}

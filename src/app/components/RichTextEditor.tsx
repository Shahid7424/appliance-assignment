"use client";
import { useState, useEffect } from "react";
import { Button, Card } from "@nextui-org/react";
// import Editor, { createEditorState } from "@react-page/editor";  
import slate from "@react-page/plugins-slate"; 
import "@react-page/editor/lib/index.css"; 

const RichTextEditor = () => {
  const plugins = [slate()];  
  const [content, setContent] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedContent = localStorage.getItem("editorContent");
      if (savedContent) {
        setContent(JSON.parse(savedContent)); 
      }
    }
  }, []);
  const saveContent = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("editorContent", JSON.stringify(content));
      alert("Content Saved!");
    }
  };

  return (
    <Card className="p-6 max-w-3xl mx-auto shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Rich Text Editor</h2>
      <div className="border p-4 rounded-md shadow-sm bg-gray-50">
        {/* <Editor value={content} onChange={setContent} plugins={plugins} /> */}
      </div>


      <Button 
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        onClick={saveContent}
      >
        Save Content
      </Button>
    </Card>
  );
};

export default RichTextEditor;

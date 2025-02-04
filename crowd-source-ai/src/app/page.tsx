// import Image from "next/image";
"use client";

import { addDefaultPost } from "@/actions/db.action";

export default function Home() {

  return (
    <div>
      <h1>Crowd Source AI</h1>
      <p>Help us make AI better by contributing to our data sets</p>
      <button
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", color: "red", outline: "2px solid blue" }}
        onClick={() => { 
          console.log("Button clicked"); 
          addDefaultPost(); 
        }}
      >
        Add Default Post
      </button>
    </div>
  );
}
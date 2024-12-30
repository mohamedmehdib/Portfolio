"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validate inputs
    if (!name || !email || !message) {
      setStatus("All fields are required");
      setLoading(false);
      return;
    }

    try {
      // Ensure Supabase client works only if env variables are correctly set
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setStatus("Supabase environment variables are missing.");
        setLoading(false);
        return;
      }

      // Insert data into Supabase
      const { error } = await supabase.from("contacts").insert([
        { name, email, message },
      ]);

      if (error) {
        console.error("Error inserting data:", error.message);
        setStatus("Failed to submit the form. Please try again.");
      } else {
        console.log("Data inserted successfully");
        setStatus("Form submitted successfully!");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err: any) {
      console.error("Unexpected error inserting data:", err.message);
      setStatus("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  };

  if (typeof window === "undefined") {
    // Prevent execution during server-side rendering or build
    return null;
  }

  return (
    <div id="contact" className="text-zinc-600 bg-gray-300 py-5">
      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
      />
      <div className="text-center text-3xl md:text-5xl md:py-10">Contact Us!</div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="md:w-1/2 my-auto px-2 md:px-10 md:space-y-2">
          <div className="flex text-left md:text-xl items-center space-x-3">
            <i className="p-2 md:p-5 rounded-full text-3xl md:text-4xl uil uil-map-marker"></i>
            <p>Tunisia, Sousse</p>
          </div>
          <div className="flex text-left md:text-xl items-center space-x-3">
            <i className="p-2 md:p-5 rounded-full text-3xl md:text-4xl uil uil-phone"></i>
            <p>52 975 473</p>
          </div>
          <div className="flex text-left md:text-xl items-center space-x-3">
            <i className="p-2 md:p-5 rounded-full text-3xl md:text-4xl uil uil-mailbox"></i>
            <p>contact@mohamedmehdi.me</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:w-1/2 space-y-5 p-4 md:p-12"
        >
          {status && <p className="text-zinc-600 text-center text-lg mt-2">{status}</p>}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="placeholder:text-gray-600 resize-none outline-none border-2 border-gray-600 bg-zinc-300 rounded-xl text-lg md:text-xl p-2 md:p-3"
            placeholder="Enter your name ..."
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="placeholder:text-gray-600 resize-none outline-none border-2 border-gray-600 bg-zinc-300 rounded-xl text-lg md:text-xl p-2 md:p-3"
            placeholder="Enter your email ..."
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="placeholder:text-gray-600 resize-none outline-none border-2 border-gray-600 bg-zinc-300 rounded-xl text-lg md:text-xl p-2 md:p-3 h-60"
            placeholder="Enter your message ..."
          />
          <button
            className="rounded-xl bg-gray-600 disabled:bg-gray-400 text-zinc-300 p-3 w-fit disabled:hover:scale-100 hover:scale-125 duration-300"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

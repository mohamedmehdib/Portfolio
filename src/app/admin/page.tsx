"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Projects from "./Projects";
import ContactTable from "./Contact";
import Image from "next/image";

export const dynamic = "force-dynamic";

type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

type User = {
  id: number;
  email: string;
  password: string;
};

const AdminDashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageUrl] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"upload" | "contacts">("upload");

  // Fetch contacts data from Supabase
  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase.from("contacts").select("*");
      if (error) {
        console.error(error);
      } else {
        setContacts(data || []);
      }
    };

    fetchContacts();
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      setErrorMessage("User not found.");
      return;
    }

    const user = data as User;

    if (user.password === password) {
      setIsModalOpen(false);
      setEmail("");
      setPassword("");
    } else {
      setErrorMessage("Incorrect password.");
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (error) {
      console.error(error);
    } else {
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    }
  };

  return (
    <div className="p-6 bg-gray-300 text-zinc-600 min-h-screen">
      {isModalOpen && (
        <div className="fixed flex justify-center items-center w-screen h-screen">
          <div className="bg-gray-300 p-6 border-2 border-zinc-600 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-zinc-600 text-zinc-600 placeholder:text-zinc-600 bg-gray-300 rounded p-2"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-zinc-600 text-zinc-600 placeholder:text-zinc-600 bg-gray-300 rounded p-2"
                required
              />
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="w-full duration-200 bg-zinc-600 text-gray-300 py-2 rounded hover:bg-zinc-700"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {!isModalOpen && (
        <>
          <h2 className="text-3xl font-semibold text-zinc-600 mb-6">Admin Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div
              onClick={() => setActiveView("upload")}
              className="bg-gray-300 p-6 rounded-xl shadow-lg hover:shadow-xl cursor-pointer transition duration-200"
            >
              <h3 className="text-2xl font-semibold text-zinc-600">Manage Projects</h3>
              <p className="mt-4 text-zinc-500">Upload images and add project URLs to keep track of your work.</p>
            </div>

            <div
              onClick={() => setActiveView("contacts")}
              className="bg-gray-300 p-6 rounded-xl shadow-lg hover:shadow-xl cursor-pointer transition duration-200"
            >
              <h3 className="text-2xl font-semibold text-zinc-600">View Contacts</h3>
              <p className="mt-4 text-zinc-500">See all the messages and contact details submitted by users.</p>
            </div>
          </div>

          {activeView === "upload" && (
            <>
              <h3 className="text-xl font-semibold text-zinc-600 mb-4">Upload Image</h3>
              <Projects />
              {imageUrl && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-zinc-600 mb-2">Uploaded Image</h3>
                  <Image src={imageUrl} alt="Uploaded" className="w-full h-auto" />
                </div>
              )}
            </>
          )}

          {activeView === "contacts" && (
            <>
              <h3 className="text-xl font-semibold text-zinc-600 mb-4">Contact Table</h3>
              <ContactTable contacts={contacts} handleDelete={handleDelete} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;

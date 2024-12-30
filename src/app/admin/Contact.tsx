import React from "react";

export const dynamic = "force-dynamic";

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface ContactProps {
  contacts: Contact[];
  handleDelete: (id: number) => void;
}

const ContactTable: React.FC<ContactProps> = ({ contacts, handleDelete }) => {
  // Sort contacts by created_at in descending order (newest first)
  const sortedContacts = [...contacts].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="overflow-x-auto bg-gray-300 shadow-md">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-300 text-zinc-600">
          <tr>
            <th className="border border-zinc-600 p-3 text-left">Name</th>
            <th className="border border-zinc-600 p-3 text-left">Email</th>
            <th className="border border-zinc-600 p-3 text-left">Message</th>
            <th className="border border-zinc-600 p-3 text-left">Submitted At</th>
            <th className="border border-zinc-600 p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedContacts.map((contact) => (
            <tr key={contact.id}>
              <td className="border border-zinc-600 p-3">{contact.name}</td>
              <td className="border border-zinc-600 p-3">{contact.email}</td>
              <td className="border border-zinc-600 p-3">{contact.message}</td>
              <td className="border border-zinc-600 p-3">
                {new Date(contact.created_at).toLocaleString("en-GB", {
                  hour12: false, // 24-hour format
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </td>
              <td className="border border-zinc-600 p-3 space-x-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;

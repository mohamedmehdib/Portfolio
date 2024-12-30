"use client"
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !message) {
      setStatus('All fields are required');
      return;
    }

    // Insert data into Supabase
    const { error } = await supabase.from('contacts').insert([
      { 
        name, 
        email, 
        message 
      }
    ]);

    if (error) {
      console.error('Error inserting data:', error.message);
      setStatus('Failed to submit the form. Please try again.');
    } else {
      console.log('Data inserted successfully');
      setStatus('Form submitted successfully!');
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded p-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border rounded p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
      {status && <p className="text-red-500">{status}</p>}
    </form>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface Project {
  id: number;
  url: string;
  project_link: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Ensure Supabase client works only if env variables are correctly set
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.error("Supabase environment variables are missing.");
          return;
        }

        const { data, error } = await supabase
          .from("images")
          .select("id, url, project_link");

        if (error) {
          console.error("Error fetching projects:", error.message);
        } else {
          setProjects(data || []);
        }
      } catch (err: Error) {
        console.error("Unexpected error fetching projects:", err.message);
      }
    };

    fetchProjects();
  }, []);

  if (typeof window === "undefined") {
    // Prevent execution during server-side rendering or build
    return null;
  }

  return (
    <div id="projects" className="text-zinc-600 bg-gray-300 py-5">
      <div className="text-center md:text-5xl text-4xl">My Latest Projects</div>
      <div className="md:p-10 p-5 flex flex-wrap justify-center">
        {projects.map((item) => (
          <div
            key={item.id}
            className="block w-96 h-52 md:hover:scale-125 relative md:m-10 my-5 duration-200"
          >
            <a href={item.project_link} target="_blank" rel="noopener noreferrer">
              <Image
                alt="Project image"
                className="object-top hover:object-bottom object-cover duration-[3s] rounded-xl cursor-pointer"
                src={item.url}
                width={400} // Add fixed width
                height={200} // Add fixed height
                priority // Improves performance for above-the-fold content
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

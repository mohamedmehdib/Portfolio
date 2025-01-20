"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Loading from "./Loading";

interface Project {
  id: number;
  url: string;
  project_link: string;
  ranking: number;
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error("Supabase environment variables are missing.");
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);

        const { data, error } = await supabase
          .from("images")
          .select("id, url, project_link, ranking")
          .order("ranking", { ascending: true });

        if (error) {
          console.error("Error fetching projects:", error.message);
        } else {
          setProjects(data || []);
        }
      } catch (err) {
        console.error("Unexpected error fetching projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div id="projects" className="text-zinc-600 bg-gray-300 py-5">
      <div className="text-center md:text-5xl text-4xl">My Latest Projects</div>
      <div className="md:p-10 p-5 flex flex-wrap justify-center">
        {isLoading ? (
          <Loading />
        ) : (
          projects.map((item) => (
            <div
              key={item.id}
              className="block w-96 md:hover:scale-125 relative md:m-10 my-5 duration-200"
            >
              <a href={item.project_link} target="_blank" rel="noopener noreferrer">
                <Image
                  alt="Project image"
                  className="object-top hover:object-bottom object-cover h-52 duration-[3s] rounded-xl cursor-pointer"
                  src={item.url}
                  width={400}
                  height={200}
                  priority
                />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

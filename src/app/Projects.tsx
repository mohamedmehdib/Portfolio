"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase';

// Define the structure of the project data
interface Project {
  id: number;
  url: string;
  project_link: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])

  // Fetch projects data from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      // Query the Supabase table for projects (with URL and project link)
      const { data, error } = await supabase
        .from('images')  // Your table name
        .select('id, url, project_link'); // Select relevant columns

      if (error) {
        console.error('Error fetching projects:', error.message);
      } else {
        setProjects(data || []);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div id="projects" className="text-zinc-600 bg-gray-300 py-5">
      <div className="text-center md:text-5xl text-4xl">My Latest Projects</div>
      <div className="md:p-10 p-5 flex flex-wrap justify-center">
        {projects.map((item) => {
          return (
            <div key={item.id} className="block w-96 h-52 hover:scale-125 relative md:m-10 my-5 duration-200">
              {/* Display the image with the URL */}
              <a href={item.project_link} target='_blank'>
                <Image
                  alt={item.url}
                  className="object-top hover:object-bottom object-cover duration-[3s] rounded-xl cursor-pointer"
                  src={item.url}
                  layout="fill" // Assuming the image will cover the container size
                />
              </a>
              {/* Display the project link */}
              <div className="pt-44 text-center">
                <a
                  href={item.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

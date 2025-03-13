"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const Projects: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [projectLink, setProjectLink] = useState("");
  const [ranking, setRanking] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [projects, setProjects] = useState<{ id: number; project_link: string; url: string; ranking: number }[]>([]);
  const [editingProject, setEditingProject] = useState<{ id: number; project_link: string; url: string; ranking: number } | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase.from("images").select("*").order("ranking", { ascending: true });
        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        setMessage(`Error loading projects: ${(error as Error).message}`);
      }
    };

    fetchProjects();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!image || !projectLink.trim() || ranking < 1) {
      setMessage("Please provide an image, a project link, and a valid ranking.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const timestamp = Date.now();
      const fileExt = image.name.split(".").pop();
      const filePath = `${projectLink}_${timestamp}.${fileExt}`;

      const { error: storageError } = await supabase.storage.from("images").upload(filePath, image);
      if (storageError) throw storageError;

      const publicURL = supabase.storage.from("images").getPublicUrl(filePath).data?.publicUrl;
      if (!publicURL) throw new Error("Failed to retrieve public URL.");

      const { error: dbError } = await supabase.from("images").insert([{ project_link: projectLink, url: publicURL, ranking }]);
      if (dbError) throw dbError;

      const { data: updatedProjects, error: fetchError } = await supabase.from("images").select("*").order("ranking", { ascending: true });
      if (fetchError) throw fetchError;

      setProjects(updatedProjects || []);
      setMessage("Image uploaded and saved to the database successfully!");
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  const updateRanking = async (projectId: number, newRanking: number) => {
    try {
      const { error } = await supabase.from("images").update({ ranking: newRanking }).eq("id", projectId);
      if (error) throw error;

      const { data: updatedProjects, error: fetchError } = await supabase.from("images").select("*").order("ranking", { ascending: true });
      if (fetchError) throw fetchError;

      setProjects(updatedProjects || []);
      setMessage("Ranking updated successfully!");
    } catch (error) {
      setMessage(`Error updating ranking: ${(error as Error).message}`);
    }
  };

  const deleteProject = async (projectId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      const project = projects.find((p) => p.id === projectId);
      if (!project) throw new Error("Project not found");

      const filePath = project.url.split("/").pop();
      if (!filePath) throw new Error("File path invalid");

      const { error: deleteStorageError } = await supabase.storage.from("images").remove([filePath]);
      if (deleteStorageError) throw deleteStorageError;

      const { error: deleteDbError } = await supabase.from("images").delete().eq("id", projectId);
      if (deleteDbError) throw deleteDbError;

      setProjects(projects.filter((p) => p.id !== projectId));
      setMessage("Project deleted successfully!");
    } catch (error) {
      setMessage(`Error deleting project: ${(error as Error).message}`);
    }
  };

  const startEditing = (project: { id: number; project_link: string; url: string; ranking: number }) => {
    setEditingProject(project);
    setProjectLink(project.project_link);
    setRanking(project.ranking);
  };

  const cancelEditing = () => {
    setEditingProject(null);
    setProjectLink("");
    setRanking(0);
  };

  const updateProject = async () => {
    if (!editingProject || !projectLink.trim() || ranking < 1) {
      setMessage("Please provide a project link and a valid ranking.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("images")
        .update({ project_link: projectLink, ranking })
        .eq("id", editingProject.id);
      if (error) throw error;

      const { data: updatedProjects, error: fetchError } = await supabase.from("images").select("*").order("ranking", { ascending: true });
      if (fetchError) throw fetchError;

      setProjects(updatedProjects || []);
      setMessage("Project updated successfully!");
      setEditingProject(null);
      setProjectLink("");
      setRanking(0);
    } catch (error) {
      setMessage(`Error updating project: ${(error as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-300 shadow-md border-2 border-zinc-600 rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-zinc-600 mb-6">Upload Your Project</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
        <input
          type="text"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
          className="border-2 border-gray-600 bg-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Ranking</label>
        <input
          type="number"
          min="1"
          value={ranking}
          onChange={(e) => setRanking(Number(e.target.value))}
          className="border-2 border-gray-600 bg-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border-2 border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>

      {editingProject ? (
        <div className="flex gap-4">
          <button
            onClick={updateProject}
            disabled={uploading}
            className={`w-full p-3 bg-zinc-600 text-gray-300 rounded-lg font-semibold ${
              uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-700"
            } transition-all`}
          >
            {uploading ? "Updating..." : "Update Project"}
          </button>
          <button
            onClick={cancelEditing}
            className="w-full p-3 bg-red-600 text-gray-300 rounded-lg font-semibold hover:bg-red-700 transition-all"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={uploadImage}
          disabled={uploading}
          className={`w-full p-3 bg-zinc-600 text-gray-300 rounded-lg font-semibold ${
            uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-700"
          } transition-all`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      )}

      {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Uploaded Projects</h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-300 shadow-lg rounded-lg overflow-hidden">
                <Image
                  src={project.url}
                  alt={project.project_link}
                  width={300}
                  height={200}
                  unoptimized
                  className="object-cover object-top w-full h-[200px] transition-transform transform hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{project.project_link}</h3>
                  <p className="text-sm text-gray-500">Ranking: {project.ranking}</p>
                  <input
                    type="number"
                    min="1"
                    value={project.ranking}
                    onChange={(e) => updateRanking(project.id, Number(e.target.value))}
                    className="border mt-2 p-1 rounded-md w-full"
                  />
                  <a
                    href={project.project_link}
                    className="text-zinc-500 mt-2 inline-block hover:text-zinc-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                  <br />
                  <button
                    onClick={() => startEditing(project)}
                    className="mt-4 p-2 rounded-xl mx-1 bg-blue-500 text-white hover:bg-blue-700 duration-300"
                  >
                    Edit Project
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="mt-4 p-2 rounded-xl bg-red-500 text-white hover:bg-red-700 duration-300"
                  >
                    Delete Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No projects uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
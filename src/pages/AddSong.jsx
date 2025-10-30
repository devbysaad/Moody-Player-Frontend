import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL.replace(/\/$/, "");

const AddSong = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    mood: "happy", // Default mood
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate form
    if (!formData.title || !formData.artist || !formData.mood || !file) {
      setError("Please fill all fields and upload an audio file");
      setLoading(false);
      return;
    }

    try {
      // Create form data for file upload
      const uploadData = new FormData();
      uploadData.append("title", formData.title);
      uploadData.append("artist", formData.artist);
      uploadData.append("mood", formData.mood);
      uploadData.append("audio", file);

      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to upload songs");
        setLoading(false);
        return;
      }

      // Send request to backend
      const response = await axios.post(`${BASE_URL}/songs`, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Song uploaded successfully!");
      // Reset form
      setFormData({
        title: "",
        artist: "",
        mood: "happy",
      });
      setFile(null);
      
      // Reset file input
      document.getElementById("audio-file").value = "";
      
      // Navigate to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Error uploading song:", err);
      setError(err.response?.data?.error || "Failed to upload song. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-8 md:py-12">
      <div className="max-w-xl mx-auto card backdrop-blur-md p-6 md:p-8">
        <h1 className="text-3xl font-bold gradient-text mb-6 text-center">
          Add New Song
        </h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-500/20 border border-green-500/50 text-green-100 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Song Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full"
              placeholder="Enter song title"
            />
          </div>

          <div>
            <label htmlFor="artist" className="block text-sm font-medium text-gray-300 mb-1">
              Artist Name
            </label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={formData.artist}
              onChange={handleInputChange}
              className="w-full"
              placeholder="Enter artist name"
            />
          </div>

          <div>
            <label htmlFor="mood" className="block text-sm font-medium text-gray-300 mb-1">
              Mood
            </label>
            <select
              id="mood"
              name="mood"
              value={formData.mood}
              onChange={handleInputChange}
              className="w-full"
            >
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="energetic">Surprised</option>
              <option value="calm">Neutral</option>
              <option value="angry">Angry</option>
              <option value="angry">Fear Full</option>
            </select>
          </div>

          <div>
            <label htmlFor="audio-file" className="block text-sm font-medium text-gray-300 mb-1">
              Audio File
            </label>
            <input
              type="file"
              id="audio-file"
              accept="audio/*"
              onChange={handleFileChange}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
            />
            <p className="text-xs text-gray-400 mt-1">
              Supported formats: MP3, WAV, OGG (Max size: 10MB)
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg gradient-bg text-white font-medium shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Uploading..." : "Upload Song"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSong;
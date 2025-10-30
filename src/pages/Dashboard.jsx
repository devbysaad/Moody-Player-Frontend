// src/pages/Dashboard.jsx
import React, { useState } from "react";
import FacialExpression from "../components/FacialExpression";
import MoodSongs from "../components/MoodSongs";

const Dashboard = () => {
  const [songs, setSongs] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-6 pb-16">
      <div className="px-4 sm:px-6 py-6 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Moody Player
          </h1>
          <p className="text-gray-400 mt-2">Music that matches your mood</p>
        </div>
        
        <div className="space-y-8">
          <FacialExpression songs={songs} setSongs={setSongs} />
          <MoodSongs songs={songs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

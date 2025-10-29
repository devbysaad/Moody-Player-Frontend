// src/pages/Dashboard.jsx
import React, { useState } from "react";
import FacialExpression from "../components/FacialExpression";
import MoodSongs from "../components/MoodSongs";

const Dashboard = () => {
  const [songs, setSongs] = useState([]);

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <FacialExpression songs={songs} setSongs={setSongs} />
      <MoodSongs songs={songs} />
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const FacialExpression = ({ setSongs }) => {
  const videoRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [mood, setMood] = useState("Not Started");

  // Load models & start camera
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");
        startVideo();
      } catch (err) {
        console.error("Model loading failed:", err);
      }
    };

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera not accessible:", err);
      }
    };

    loadModels();
  }, []);

  // One-time detection
  const detectOnce = async () => {
    const video = videoRef.current;
    if (!video) return;

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections?.length > 0) {
      const expressions = detections[0].expressions;
      let highest = 0;
      let expressionName = "";

      for (const [name, value] of Object.entries(expressions)) {
        if (value > highest) {
          highest = value;
          expressionName = name;
        }
      }

      setMood(expressionName);

      // Remove trailing slash if present to prevent double slashes
      const BASE_URL = (import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:3000").replace(/\/$/, "");
      axios.get(`${BASE_URL}/songs?mood=${expressionName}`)

        .then((response) => {
          setSongs(response.data?.songs || []);
        })
        .catch((err) => {
          console.error("Error fetching songs:", err);
        });

    } else {
      setMood("No Face Detected");
    }

    setIsDetecting(false);
  };

  // Handle button click
  const handleStartListening = async () => {
    if (isDetecting) return;
    setIsDetecting(true);
    setMood("Detecting...");
    await detectOnce();
  };

  return (
    <div className="bg-gray-900/70 backdrop-blur-md rounded-xl text-white flex flex-col items-center justify-center p-6 border border-purple-500/20 shadow-[0_0_25px_rgba(139,92,246,0.2)]">
      <h2 className="text-3xl font-bold mb-6 text-center">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Live Mood Detection
        </span>
      </h2>

      <div className="bg-gray-800/80 rounded-xl shadow-lg p-6 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
        {/* Video */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="rounded-lg w-full max-h-[300px] object-cover border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-5 p-4">
          <div className="text-center md:text-left w-full">
            <h3 className="text-xl font-semibold text-gray-300">Your Current Mood</h3>
            <p className="capitalize text-2xl mt-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">{mood}</p>
          </div>

          <button
            onClick={handleStartListening}
            disabled={isDetecting}
            className={`px-6 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg w-full md:w-auto ${
              isDetecting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            }`}
          >
            {isDetecting ? "Detecting..." : "Start Listening"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacialExpression;

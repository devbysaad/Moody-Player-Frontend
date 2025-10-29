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

      const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:3000";
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
    <div className="bg-gray-900 rounded-t-xl text-white min-h-[50%] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Live Mood Detection</h1>

      <div className="bg-gray-800 rounded-xl min-h-[50%] shadow-md p-6 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Video */}
        <div className="flex justify-center min-h-[50%] items-center w-full md:w-1/2">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="rounded-lg w-[90%] max-h-[300px] object-cover"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-3">
          <h2 className="text-xl font-semibold">Your Current Mood</h2>
          <p className="capitalize text-purple-400 text-lg">{mood}</p>

          <button
            onClick={handleStartListening}
            disabled={isDetecting}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              isDetecting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
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

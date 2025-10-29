import React, { useRef, useState } from "react";

const MoodSongs = ({ songs = [] }) => {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const audioRefs = useRef([]);

  const handlePlay = (index) => {
    // Pause all other audios before playing the selected one
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    // Play selected song
    const selectedAudio = audioRefs.current[index];
    if (selectedAudio) {
      if (currentPlaying === index) {
        selectedAudio.pause();
        setCurrentPlaying(null);
      } else {
        selectedAudio.play().catch((err) => console.error("Audio play error:", err));
        setCurrentPlaying(index);
      }
    }
  };

  return (
    <div className=" bg-gray-900 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">🎧 Songs for Your Mood</h2>

      {!songs || songs.length === 0 ? (
        <p className="text-gray-400">No songs found for this mood.</p>
      ) : (
        <ul className="space-y-3">
          {songs.map((song, index) => (
            <li
              key={index}
              className="p-4 bg-gray-800 rounded-lg flex justify-between items-center hover:bg-gray-700 transition"
            >
              {/* Song Info */}
              <div className="flex flex-col">
                <span className="font-medium text-white">{song.title || "Untitled"}</span>
                <span className="text-sm text-gray-400">{song.artist || "Unknown Artist"}</span>
              </div>

              {/* Audio Player */}
              <div
                className="p-2 rounded-lg shadow-inner"
                style={{
                  width: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <audio
                  ref={(el) => (audioRefs.current[index] = el)}
                  src={song.audio}
                  onEnded={() => setCurrentPlaying(null)}
                />
                <button
                  onClick={() => handlePlay(index)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    currentPlaying === index
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                >
                  {currentPlaying === index ? "Pause" : "Play"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoodSongs;

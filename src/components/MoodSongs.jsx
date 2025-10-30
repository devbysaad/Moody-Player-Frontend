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
    <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-8 shadow-[0_0_25px_rgba(139,92,246,0.2)] border border-purple-500/20">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          🎧 Songs for Your Mood
        </span>
      </h2>

      {!songs || songs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400 mb-3">No songs found for this mood yet.</p>
          <p className="text-sm text-gray-500">Try detecting your mood first!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {songs.map((song, index) => (
            <li
              key={index}
              className="p-5 bg-gray-800/80 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4 hover:bg-gray-700/90 transition-all duration-300 border border-gray-700/50 shadow-md"
            >
              {/* Song Info */}
              <div className="flex flex-col text-center sm:text-left w-full sm:w-auto">
                <span className="font-medium text-white text-lg">{song.title || "Untitled"}</span>
                <span className="text-sm text-gray-400 mt-1">{song.artist || "Unknown Artist"}</span>
              </div>

              {/* Audio Player */}
              <div className="p-2 rounded-lg w-full sm:w-auto flex justify-center">
                <audio
                  ref={(el) => (audioRefs.current[index] = el)}
                  src={song.audio}
                  onEnded={() => setCurrentPlaying(null)}
                />
                <button
                  onClick={() => handlePlay(index)}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg w-full sm:w-auto ${
                    currentPlaying === index
                      ? "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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

import React, { useState, useRef } from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import "./VoiceOver.css"; // Import CSS

const VoiceOver = () => {
  const audioTracks = [
    {
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      title: "Commercial Demo",
    },
    {
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      title: "Narration Sample",
    },
    {
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      title: "Character Voices",
    },
  ];

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const handlePlayPause = (track) => {
    if (currentTrack?.src === track.src && isPlaying) {
      // If same track is playing, pause it
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // If switching tracks, reset and play new one
      if (currentTrack?.src !== track.src) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = track.src;
      }

      audioRef.current.play();
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to start
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  // Automatically stop when track ends
  audioRef.current.onended = () => {
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  return (
    <section className="voice-over">
      {/* <h2 className="section-title">Voice Over Samples</h2> */}
      <div className="audio-list">
        {audioTracks.map((track, index) => (
          <div key={index} className="audio-card">
            <button
              className="play-button"
              onClick={() => handlePlayPause(track)}
            >
              {currentTrack?.src === track.src && isPlaying ? (
                <FaPause />
              ) : (
                <FaPlay />
              )}
            </button>
            {currentTrack?.src === track.src && isPlaying && (
              <button className="stop-button" onClick={handleStop}>
                <FaStop />
              </button>
            )}
            <span className="audio-title">{track.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VoiceOver;

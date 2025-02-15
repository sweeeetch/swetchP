import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import "./VoiceOver.css";

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
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack.src;
      audioRef.current.play();
      setIsPlaying(true);
    }
    return () => {
      audioRef.current.pause();
    };
  }, [currentTrack]);

  useEffect(() => {
    const updateProgress = () => {
      const percentage =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percentage || 0);
    };

    if (isPlaying) {
      const interval = setInterval(updateProgress, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handlePlayPause = (track) => {
    if (currentTrack === track && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <section className="voice-over">
      <h2 className="section-title">Voice Over Samples</h2>
      <div className="audio-list">
        {audioTracks.map((track, index) => (
          <div key={index} className="audio-card">
            <button
              className="play-button"
              onClick={() => handlePlayPause(track)}
            >
              {currentTrack === track && isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <span className="audio-title">{track.title}</span>
            <div className="sound-wave">
              <svg viewBox="0 0 1440 560" preserveAspectRatio="none">
                <g
                  stroke-linecap="round"
                  stroke="url(#SvgjsLinearGradient1100)"
                >
                  {[...Array(30)].map((_, i) => (
                    <path
                      key={i}
                      d={`M${375 + i * 23} ${200 + (i % 3) * 20} L${
                        375 + i * 23
                      } ${360 - (i % 3) * 20}`}
                      strokeWidth="17.25"
                      className={`bar-scale${(i % 3) + 1} ${
                        isPlaying && currentTrack === track
                          ? ""
                          : "stop-animation"
                      }`}
                    ></path>
                  ))}
                </g>
              </svg>
              <div className="progress-bar">
                <div
                  className="progress-color"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VoiceOver;

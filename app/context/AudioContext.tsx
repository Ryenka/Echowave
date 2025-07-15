"use client";

import React, { createContext, useContext, useRef, useState, useEffect, ReactNode } from "react";
import { usePlaylist } from "./PlaylistContext"; 

type AudioContextType = {
  play: () => void;
  pause: () => void;
  togglePlay: () => void; 
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  seek: (time: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>; 
};

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  
  const { currentTrack, playNext } = usePlaylist();

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (audioRef.current.src !== currentTrack.url) {
        audioRef.current.src = currentTrack.url;
      }
      audioRef.current.play().catch(e => console.error("Playback was interrupted"));
      setIsPlaying(true);
    }
  }, [currentTrack]); 

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    
    audio.addEventListener("ended", playNext);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("ended", playNext);
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [playNext]); 

  const play = () => audioRef.current?.play();
  const pause = () => audioRef.current?.pause();

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const value = { play, pause, togglePlay, isPlaying, currentTime, duration, seek, audioRef };

  return (
    <AudioContext.Provider value={value}>
      <>
        <audio ref={audioRef} /> 
        {children}
      </>
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio debe usarse dentro de <AudioProvider>");
  }
  return context;
}




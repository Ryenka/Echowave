"use client"

import { createContext, useContext, useRef, useState, useEffect } from "react"

type AudioContextType = {
  play: () => void
  pause: () => void
  isPlaying: boolean
  currentTime: number
  duration: number
  seek: (time: number) => void
  setSrc: (url: string) => void
}

const AudioContext = createContext<AudioContextType | null>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current

    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime)
      const setAudioDuration = () => setDuration(audio.duration)

      audio.addEventListener("timeupdate", updateTime)
      audio.addEventListener("loadedmetadata", setAudioDuration)

      return () => {
        audio.removeEventListener("timeupdate", updateTime)
        audio.removeEventListener("loadedmetadata", setAudioDuration)
      }
    }
  }, [audioRef.current])

  const play = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("http://localhost:8080/api/reproductor/stream")
    }
    audioRef.current.play()
    setIsPlaying(true)
  }

  const pause = () => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const setSrc = (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = url;
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    } else {
      audioRef.current = new Audio(url);
    }

    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <AudioContext.Provider value={{ play, pause, isPlaying, currentTime, duration, seek, setSrc }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio debe usarse dentro de <AudioProvider>")
  }
  return context
}

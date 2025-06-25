"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios";
import { useAudio } from "../context/AudioContext";
import { usePlaylist } from "../context/PlaylistContext"
import { useSearchParams } from "next/navigation"
import { Heart, Share2, SkipBack, Play, Pause, SkipForward, Shuffle, Repeat } from "lucide-react"

function PlaylistItem({
  title,
  artist,
  duration,
  isActive,
}: {
  title: string
  artist: string
  duration: string
  isActive: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e1b2d] cursor-pointer ${isActive ? "bg-[#1e1b2d]" : ""}`}
    >
      <div className="w-10 h-10 bg-gray-600 rounded-md"></div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{title}</h4>
        <p className="text-xs text-gray-400 truncate">{artist}</p>
      </div>
      <span className="text-xs text-gray-400">{duration}</span>
    </div>
  )
}

export default function PlayerPage() {
  const { play, pause, isPlaying, currentTime, duration, seek, setSrc } = useAudio();
  const { playlist, fetchPlaylist } = usePlaylist()
  const searchParams = useSearchParams()

  useEffect(() => {
    const reload = searchParams.get("reload")
    if (reload === "true") {
      fetchPlaylist()
    }
  }, [searchParams])

  useEffect(() => {
  if (playlist.length > 0) {
    const url = "http://localhost:8080/api/reproductor/stream"
    setSrc(url)
  }
}, [playlist])

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  
  function formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-[#1a1523] text-white flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-[#1e2139] py-4">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-purple-500 rounded-md flex items-center justify-center">
              <div className="w-4 h-4 bg-[#1e2139] rounded-md flex items-center justify-center">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-purple-500 rounded-sm"></div>
              </div>
            </div>
            <span className="text-xl font-bold">EchoWave</span>
          </Link>

          <div className="space-x-6">
            <Link href="/" className="hover:text-purple-400">
              Home
            </Link>
            <Link href="/search" className="hover:text-purple-400">
              Search
            </Link>
            <Link href="/library" className="hover:text-purple-400">
              Your Library
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Player Section */}
          <div className="flex flex-col items-center">
            {/* Player Card */}
            <div className="bg-[#2a2d47] rounded-xl p-6 max-w-md w-full mb-12">
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 w-24 h-24 rounded-lg"></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Now Playing</p>
                  <h2 className="text-lg font-medium">
                    {(playlist && playlist.length > 0) ? playlist[0].fileName : "No track uploaded"}
                  </h2>
                  <div className="flex items-center gap-4 mt-6">
                    <button className="text-purple-400 hover:text-purple-300">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <button className="text-gray-400 hover:text-white">
                <Shuffle className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <SkipBack className="h-5 w-5" />
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 rounded-full p-3" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
              </button>
              <button className="text-gray-400 hover:text-white">
                <SkipForward className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Repeat className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full">
              <div
                className="relative w-full"
                onClick={(e) => {
                  const bar = e.currentTarget
                  const clickX = e.nativeEvent.offsetX
                  const newTime = (clickX / bar.clientWidth) * duration
                  seek(newTime)
                }}
              >
                <div className="w-full h-1 bg-gray-700 rounded-full">
                  <div
                    className="h-1 bg-purple-500 rounded-full"
                    style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full"
                    style={{ left: `${(currentTime / duration) * 100 || 0}%` }}
                  />
                </div>
              </div>

              {/* Tiempos alineados a izquierda y derecha */}
              <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
          
          
          {/* Playlist Section */}
          <div className="bg-[#2a2d47] rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Up Next</h3>
            <div className="space-y-3">
              {playlist.map((audio, index) => (
                <PlaylistItem
                  key={index}
                  title={audio.fileName}
                  artist="You"
                  duration="-:--"
                  isActive={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e2139] py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-purple-500 rounded-md flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#1e2139] rounded-md flex items-center justify-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-purple-500 rounded-sm"></div>
                  </div>
                </div>
                <span className="text-xl font-bold">EchoWave</span>
              </Link>
              <p className="text-sm text-gray-400 mt-1">Echowave</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-gray-400 mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm hover:text-purple-400">
                      Vocal Music
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-purple-400">
                      Instrument Music
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-purple-400">
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-purple-400">
                      Licensing
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-400 mb-4">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm hover:text-purple-400">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-purple-400">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-purple-400">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-purple-400">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-400 mb-4">Social Media</h3>
                <p className="text-sm mb-4">For recent updates and news follow our social media feeds</p>
                <div className="flex gap-3">
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-youtube"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-mail"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

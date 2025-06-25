"use client";

import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAudio } from "../context/AudioContext";
import { Search, Heart, MoreHorizontal, Download, Play, Pause } from "lucide-react"

export default function TracksPage() {
  const [ultimoAudio, setUltimoAudio] = useState<{ filename: string } | null>(null);
  const { play, pause, isPlaying } = useAudio();

  const handlePlay = () => {
    if (isPlaying) {
      pause();
     } else {
     play();
   }
 };


  useEffect(() => {
    axios.get("http://localhost:8080/api/archivo/ultimo", {
      withCredentials: true,
    })
      .then(res => setUltimoAudio(res.data))
      .catch(err => console.error("Error al obtener el archivo subido", err))
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1523] text-white flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-[#1a1523] py-4 border-b border-[#2a2541]">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-purple-500 rounded-md flex items-center justify-center">
              <div className="w-4 h-4 bg-[#1a1523] rounded-md flex items-center justify-center">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-purple-500 rounded-sm"></div>
              </div>
            </div>
            <span className="text-xl font-bold">EchoWave</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/tracks" className="text-sm hover:text-purple-400">
              Tracks
            </Link>
            <Link href="/playlists" className="text-sm hover:text-purple-400">
              Playlists
            </Link>
            <Link href="/player" className="text-sm hover:text-purple-400">
              Player
            </Link>
          </div>
        </div>
      </nav>

      {/* Divider */}
      <div className="h-2 bg-[#131926]"></div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Music or Background"
              className="w-full bg-[#1e1b2d] border border-[#2a2541] rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Upload Success Message */}
        <div className="bg-[#2a2541] border border-purple-500 rounded-lg p-4 mb-8 flex items-center">
          <div className="bg-purple-500 rounded-full p-1 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p className="text-sm">
            Your audio file has been successfully uploaded and is now available in your library.
          </p>
        </div>

        {/* Your Uploads Section */}
        <h2 className="text-xl font-medium mb-4">Your Uploads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {ultimoAudio ? (
          <TrackCard
            title={ultimoAudio.filename}
            artist="You"
            color="bg-purple-600"
            isNew={true}
            onPlay={handlePlay}
            isPlaying={isPlaying}
          />
        ) : (
          <TrackCard
            title="Your Uploaded Track"
            artist="You"
            color="bg-purple-600"
            isNew={true}
            onPlay={handlePlay}
            isPlaying={false}
          />
        )}
        </div>

        {/* Music Tracks Grid */}
        <h2 className="text-xl font-medium mb-4">Recommended Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <TrackCard title="Sunny seaside" artist="Andrea Bensuyuki" color="bg-blue-500" />
          <TrackCard title="Brass Attack" artist="WESTBRIGOGO feat. morgan" color="bg-orange-500" />
          <TrackCard title="One night Decision" artist="Ava Laguna" color="bg-red-500" />
          <TrackCard title="To the party" artist="Liam" color="bg-green-500" />
          <TrackCard title="Mystery Box - Instrumental Ver." artist="Mia Levi" color="bg-purple-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <TrackCard title="Rustlen" artist="Evgeny Bensuyuka" color="bg-indigo-500" />
          <TrackCard title="Unbreakable Code" artist="WESTBRIGOGO feat. morgan" color="bg-yellow-500" />
          <TrackCard title="Lying to Myself" artist="Daniel Brown" color="bg-pink-500" />
          <TrackCard title="Spiral Bounder" artist="Daniel Brown" color="bg-teal-500" />
          <TrackCard title="Double Earth" artist="Misha Grigorieva" color="bg-cyan-500" />
        </div>

        <div className="flex justify-center">
          <button className="px-4 py-2 text-sm border border-[#2a2541] rounded-full text-purple-400 hover:bg-[#2a2541] transition">
            View More
          </button>
        </div>
      </main>

      {/* Footer */}
      <header className="bg-[#1e2139] py-6">
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
      </header>
    </div>
  )
}

function TrackCard({
  title,
  artist,
  color,
  isNew = false,
  onPlay,
  isPlaying = false,
}: {
  title: string;
  artist: string;
  color: string;
  isNew?: boolean;
  onPlay?: () => void;
  isPlaying?: boolean;
}) {
  return (
    <div
      className={`bg-[#1e1b2d] rounded-lg p-3 hover:bg-[#252236] transition ${isNew ? "ring-2 ring-purple-500" : ""}`}
    >
      <div className={`${color} w-full aspect-square rounded-md mb-3 relative`}>
        {isNew && (
          <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">New</div>
        )}
      </div>
      <h3 className="text-sm font-medium truncate">{title}</h3>
      <p className="text-xs text-gray-400 truncate mb-2">{artist}</p>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-white">
            <Download className="h-4 w-4" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Heart className="h-4 w-4" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
        <button
          className="bg-[#252236] hover:bg-purple-700 rounded-full p-1"
          onClick={onPlay}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-white" />
          ) : (
            <Play className="h-4 w-4 text-white" />
          )}
        </button>
      </div>
    </div>
  )
}

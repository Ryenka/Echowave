"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { usePlaylist } from "./context/PlaylistContext"
import Link from "next/link"
import { Upload } from "lucide-react"
import axios from 'axios';


export default function UploadPage() {
  
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const { agregarAudio } = usePlaylist()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }
  const handleUpload = async () => {
  if (!selectedFile) return;
  setIsUploading(true);

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await axios.post("http://localhost:8080/api/archivo/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    const fileName = response.data.filename;
    const path = response.data.tempPath;

    await agregarAudio({ fileName, path });

    router.push("/tracks");
  } catch (error) {
    console.error("Error al subir o agregar a playlist:", error);
  } finally {
    setIsUploading(false);
  }
};;

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
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#1e1b2d] p-8 rounded-lg">
          <h2 className="text-xl mb-6 text-center">upload your audio</h2>

          <div
            className={`border border-dashed ${
              dragActive ? "border-purple-500 bg-[#2a2541]" : "border-gray-600"
            } rounded-lg p-8 mb-6 flex flex-col items-center justify-center`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-8 w-8 text-blue-400 mb-4" />
            <p className="text-sm text-center mb-1">
              {selectedFile ? selectedFile.name : "select your file or drag and drop"}
            </p>
            <p className="text-xs text-gray-500 mb-4">mp3 accepted</p>
            <label className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-4 rounded-md cursor-pointer">
              Browse
              <input type="file" className="hidden" accept=".mp3" onChange={handleFileChange} />
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1.5 px-4 rounded-md">Cancel</button>
            <button
              className={`${
                isUploading ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
              } text-white text-sm py-1.5 px-4 rounded-md flex items-center`}
              onClick={handleUpload}
              disabled={isUploading || !selectedFile}
            >
              {isUploading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </div>
      </main>
 
      {/* Footer */}
      <footer className="bg-[#1e2139] py-6 mt-auto">
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

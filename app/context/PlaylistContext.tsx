"use client"
import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

type Audio = { fileName: string; path: string }

type PlaylistContextType = {
  playlist: Audio[]
  fetchPlaylist: () => void
  agregarAudio: (audio: Audio) => Promise<void>
}

const PlaylistContext = createContext<PlaylistContextType | null>(null)

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [playlist, setPlaylist] = useState<Audio[]>([])

  const fetchPlaylist = () => {
    axios.get("http://localhost:8080/api/playlist", { withCredentials: true })
      .then(res => {
        const audios = Array.isArray(res.data) ? res.data : []
        setPlaylist(audios)
      })
      .catch(err => console.error("Error al obtener la playlist", err))
  }

  const agregarAudio = async (audio: Audio) => {
    try {
      const res = await axios.post("http://localhost:8080/api/playlist/agregar", audio, { withCredentials: true })
      if(res.data.status === "success") {
        setPlaylist(res.data.playlist)
      }
    } catch (error) {
      console.error("Error al agregar audio a la playlist", error)
    }
  }

  useEffect(() => {
    fetchPlaylist()
  }, [])

  return (
    <PlaylistContext.Provider value={{ playlist, fetchPlaylist, agregarAudio }}>
      {children}
    </PlaylistContext.Provider>
  )
}

export function usePlaylist() {
  const context = useContext(PlaylistContext)
  if (!context) throw new Error("usePlaylist debe usarse dentro de <PlaylistProvider>")
  return context
}

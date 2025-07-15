"use client"
import { createContext, useContext, useState, useEffect, ReactNode  } from "react"
import axios from "axios"

export type Track = {
  fileName: string;
  url: string;
};

type PlaylistContextType = {
  playlist: Track[];
  currentTrackIndex: number | null;
  currentTrack: Track | null; 
  fetchPlaylist: () => void;
  agregarAudio: (audio: Track) => Promise<void>;
  playNext: () => void; 
  playPrev: () => void; 
  setCurrentTrackIndex: (index: number) => void;
  shufflePlaylist: () => Promise<void>;
  deleteTrack: (indexToDelete: number) => Promise<void>;
};

const PlaylistContext = createContext<PlaylistContextType | null>(null)

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);

  const currentTrack = currentTrackIndex !== null && playlist.length > 0 ? playlist[currentTrackIndex] : null;

  const fetchPlaylist = () => {
    axios.get("http://localhost:8080/api/playlist", { withCredentials: true })
      .then(res => {
        const audios = Array.isArray(res.data) ? res.data : [];
        setPlaylist(audios);
        if (audios.length > 0 && currentTrackIndex === null) {
          setCurrentTrackIndex(0);
        }
      })
      .catch(err => console.error("Error al obtener la playlist", err));
  };

  const agregarAudio = async (audio: Track) => {
    try {
      const res = await axios.post("http://localhost:8080/api/playlist/agregar", audio, { withCredentials: true });
      const updatedPlaylist = res.data.playlist;
      setPlaylist(updatedPlaylist);
      if (currentTrackIndex === null) {
        setCurrentTrackIndex(0);
      }
    } catch (error) {
      console.error("Error al agregar audio a la playlist", error);
    }
  };
  
  const playNext = () => {
    if (playlist.length === 0 || currentTrackIndex === null) return;
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
  };

  const playPrev = () => {
    if (playlist.length === 0 || currentTrackIndex === null) return;
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
  };

  const shufflePlaylist = async () => {
    if (currentTrackIndex === null || playlist.length < 2) {
      console.log("No se puede mezclar: no hay canción sonando o la lista es muy corta.");
      return;
    }

    const trackQueEstaSonando = playlist[currentTrackIndex];
    if (!trackQueEstaSonando) {
      console.error("Error: No se encontró el track actual en la playlist.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/playlist/mezclar",
        {}, 
        { withCredentials: true }
      );
    
      const shuffledPlaylist: Track[] = Array.isArray(response.data) ? response.data : [];
      if (shuffledPlaylist.length === 0) {
        console.warn("La playlist mezclada vino vacía del backend.");
        setPlaylist([]);
        setCurrentTrackIndex(null);
        return;
      }

      const newIndex = shuffledPlaylist.findIndex(
        (track) => track.url === trackQueEstaSonando.url
      );

      setPlaylist(shuffledPlaylist);
      setCurrentTrackIndex(newIndex !== -1 ? newIndex : 0);

    } catch (error) {
      console.error("Error en la llamada para mezclar la playlist:", error);
    }
  };

  const deleteTrack = async (indexToDelete: number) => {
    const oldIndex = currentTrackIndex;

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/playlist/eliminar/${indexToDelete}`,
        { withCredentials: true }
      );

      if (response.data.status === 'error') {
        console.error("Error del backend al eliminar:", response.data.message);
        return;
      }
      
      const newPlaylist: Track[] = response.data.playlist;
      setPlaylist(newPlaylist);

      if (newPlaylist.length === 0) {
        setCurrentTrackIndex(null);
        return;
      }
      
      if (oldIndex === null || indexToDelete > oldIndex) {
        return;
      }

      if (indexToDelete < oldIndex) {
        setCurrentTrackIndex(oldIndex - 1);
        return;
      }

      if (indexToDelete === oldIndex) {
        setCurrentTrackIndex(oldIndex % newPlaylist.length);
      }

    } catch (error) {
      console.error("Error en la llamada para eliminar track:", error);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const value = {
    playlist,
    currentTrackIndex,
    currentTrack,
    fetchPlaylist,
    agregarAudio,
    playNext,
    playPrev,
    setCurrentTrackIndex,
    shufflePlaylist,
    deleteTrack,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (!context) throw new Error("usePlaylist debe usarse dentro de <PlaylistProvider>");
  return context;
}

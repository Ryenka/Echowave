import Link from "next/link"
import { Search, Heart, MoreHorizontal, Play, Plus } from "lucide-react"

function PlaylistCard({ title, trackCount, duration }: { title: string; trackCount: number; duration: string }) {
  return (
    <div className="bg-[#2a2d47] rounded-lg p-4 hover:bg-[#323654] transition cursor-pointer">
      <div className="bg-purple-600 w-full aspect-square rounded-md mb-3 flex items-center justify-center">
        <div className="text-white text-2xl">♪</div>
      </div>
      <h3 className="text-sm font-medium truncate mb-1">{title}</h3>
      <p className="text-xs text-gray-400 mb-2">
        {trackCount} tracks • {duration}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-white">
            <Heart className="h-4 w-4" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 rounded-full p-1">
          <Play className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  )
}

function PlaylistTrack({
  title,
  artist,
  duration,
  albumArt,
}: {
  title: string
  artist: string
  duration: string
  albumArt: string
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2a2d47] cursor-pointer">
      <div className={`w-12 h-12 ${albumArt} rounded-md`}></div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{title}</h4>
        <p className="text-xs text-gray-400 truncate">{artist}</p>
      </div>
      <span className="text-xs text-gray-400">{duration}</span>
      <div className="flex space-x-2">
        <button className="text-gray-400 hover:text-white">
          <Heart className="h-4 w-4" />
        </button>
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <button className="bg-[#252236] hover:bg-purple-700 rounded-full p-1">
        <Play className="h-4 w-4 text-white" />
      </button>
    </div>
  )
}

export default function PlaylistsPage() {
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
            <Link href="/playlists" className="text-sm text-purple-400">
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
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Playlists</h1>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Playlist
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search playlists..."
              className="w-full bg-[#1e1b2d] border border-[#2a2541] rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <PlaylistCard title="My Favorites" trackCount={12} duration="45:32" />
          <PlaylistCard title="Chill Vibes" trackCount={8} duration="32:18" />
          <PlaylistCard title="Workout Mix" trackCount={15} duration="58:42" />
          <PlaylistCard title="Study Session" trackCount={20} duration="1:23:15" />
        </div>  

        {/* Recently Played Section */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Recently Played</h2>
          <div className="bg-[#1e1b2d] rounded-lg p-4">
            <PlaylistTrack title="Purple haze" artist="Unknown Artist" duration="4:15" albumArt="bg-purple-600" />
            <PlaylistTrack title="Sunny seaside" artist="Andrea Bensuyuki" duration="3:24" albumArt="bg-blue-500" />
            <PlaylistTrack
              title="Brass Attack"
              artist="WESTBRIGOGO feat. morgan"
              duration="4:12"
              albumArt="bg-orange-500"
            />
            <PlaylistTrack title="One night Decision" artist="Ava Laguna" duration="2:58" albumArt="bg-red-500" />
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/tracks" className="bg-[#2a2d47] rounded-lg p-6 hover:bg-[#323654] transition text-center">
            <div className="text-purple-400 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6" />
                <path d="m21 12-6-3-6 3-6-3" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Browse Tracks</h3>
            <p className="text-sm text-gray-400">Discover new music</p>
          </Link>

          <Link href="/" className="bg-[#2a2d47] rounded-lg p-6 hover:bg-[#323654] transition text-center">
            <div className="text-purple-400 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Upload Music</h3>
            <p className="text-sm text-gray-400">Add your own tracks</p>
          </Link>

          <Link href="/player" className="bg-[#2a2d47] rounded-lg p-6 hover:bg-[#323654] transition text-center">
            <div className="text-purple-400 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Music Player</h3>
            <p className="text-sm text-gray-400">Control playback</p>
          </Link>
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

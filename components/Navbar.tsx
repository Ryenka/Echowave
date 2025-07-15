"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Tracks", href: "/tracks" },
    { name: "Player", href: "/player" },
  ]

  return (
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
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm hover:text-purple-400 ${
                pathname === item.href ? "text-purple-400 font-semibold" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

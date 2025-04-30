"use client"

import { useState, useRef } from "react"
import { Plus, Key, Hash, Star, Link, Share2 } from "lucide-react"

interface FloatingActionButtonProps {
  onCreatePassword?: () => void
  onCreateCommand?: () => void
  onCreateFavorite?: () => void
  onCreateLink?: () => void
  onCreateShared?: () => void
}

export default function FloatingActionButton({
  onCreatePassword,
  onCreateCommand,
  onCreateFavorite,
  onCreateLink,
  onCreateShared,
}: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Handle mouse leave to close the menu
  const handleMouseLeave = () => {
    setIsExpanded(false)
  }

  const handleAction = (callback?: () => void) => {
    if (callback) {
      callback()
    }
    setIsExpanded(false)
  }

  return (
    <div className="fixed bottom-6 right-4 z-50" ref={menuRef} onMouseLeave={handleMouseLeave}>
      {/* Action buttons that appear when expanded */}
      <div
        className={`flex flex-col-reverse items-end space-y-reverse space-y-3 mb-3 ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-200`}
      >
        <button
          onClick={() => handleAction(onCreatePassword)}
          className="flex items-center bg-[#2a2a2a] hover:bg-[#333333] text-white rounded-full pl-3 pr-4 py-2 shadow-lg transform transition-transform duration-200 hover:scale-105"
        >
          <Key className="h-5 w-5 mr-2 text-[#6eb5e6]" />
          <span className="text-sm">Nova Senha</span>
        </button>

        <button
          onClick={() => handleAction(onCreateCommand)}
          className="flex items-center bg-[#2a2a2a] hover:bg-[#333333] text-white rounded-full pl-3 pr-4 py-2 shadow-lg transform transition-transform duration-200 hover:scale-105"
        >
          <Hash className="h-5 w-5 mr-2 text-[#6eb5e6]" />
          <span className="text-sm">Novo Comando</span>
        </button>

        <button
          onClick={() => handleAction(onCreateFavorite)}
          className="flex items-center bg-[#2a2a2a] hover:bg-[#333333] text-white rounded-full pl-3 pr-4 py-2 shadow-lg transform transition-transform duration-200 hover:scale-105"
        >
          <Star className="h-5 w-5 mr-2 text-[#6eb5e6]" />
          <span className="text-sm">Novo Favorito</span>
        </button>

        <button
          onClick={() => handleAction(onCreateLink)}
          className="flex items-center bg-[#2a2a2a] hover:bg-[#333333] text-white rounded-full pl-3 pr-4 py-2 shadow-lg transform transition-transform duration-200 hover:scale-105"
        >
          <Link className="h-5 w-5 mr-2 text-[#6eb5e6]" />
          <span className="text-sm">Novo Link</span>
        </button>

        <button
          onClick={() => handleAction(onCreateShared)}
          className="flex items-center bg-[#2a2a2a] hover:bg-[#333333] text-white rounded-full pl-3 pr-4 py-2 shadow-lg transform transition-transform duration-200 hover:scale-105"
        >
          <Share2 className="h-5 w-5 mr-2 text-[#6eb5e6]" />
          <span className="text-sm">Senha Compartilhada</span>
        </button>
      </div>

      {/* Main button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={() => setIsExpanded(true)}
        className={`h-14 w-14 rounded-full bg-[#3b9bff] hover:bg-[#2a8aee] text-white flex items-center justify-center shadow-lg transform transition-all duration-200 ${isExpanded ? "rotate-45" : ""}`}
      >
        <Plus className="h-7 w-7" />
      </button>
    </div>
  )
}

"use client"

import { useRef, useEffect } from "react"
import { Key, Hash, Link, Share2, X } from "lucide-react"

interface CreateModalProps {
  isOpen: boolean
  onClose: () => void
  position?: { top: number; left: number; right: number }
  isDesktop: boolean
}

export default function CreateModal({ isOpen, onClose, position, isDesktop }: CreateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  // Adjust position for viewport edges
  useEffect(() => {
    if (modalRef.current && isOpen && position && isDesktop) {
      const rect = modalRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth

      // Check if modal would go off the right edge
      if (position.left + rect.width > viewportWidth) {
        modalRef.current.style.left = "auto"
        modalRef.current.style.right = `${position.right}px`
      } else {
        modalRef.current.style.left = `${position.left}px`
        modalRef.current.style.right = "auto"
      }

      modalRef.current.style.top = `${position.top}px`
    }
  }, [isOpen, position, isDesktop])

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 z-50 ${!isDesktop ? "flex items-start justify-center pt-16 md:pt-20" : ""}`}>
      <div
        ref={modalRef}
        className={`w-64 bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 overflow-hidden ${
          isDesktop ? "absolute" : ""
        }`}
        style={isDesktop && position ? {} : undefined}
      >
        <div className="absolute top-2 right-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="py-1">
          <button className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-[#252525] transition-colors">
            <Key className="h-5 w-5 mr-3 text-gray-400" />
            <span>Criar Nova Senha</span>
          </button>

          <button className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-[#252525] transition-colors">
            <Hash className="h-5 w-5 mr-3 text-gray-400" />
            <span>Criar Novo Comando</span>
          </button>

          <button className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-[#252525] transition-colors">
            <Link className="h-5 w-5 mr-3 text-gray-400" />
            <span>Criar Novo Link</span>
          </button>

          <button className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-[#252525] transition-colors">
            <Share2 className="h-5 w-5 mr-3 text-gray-400" />
            <span>Criar Senha Compartilhada</span>
          </button>
        </div>
      </div>
    </div>
  )
}

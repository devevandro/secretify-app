"use client"

import { useRef, useEffect } from "react"
import { Clock, LinkIcon, X } from "lucide-react"

interface PasswordDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  position: { top: number; left: number }
  passwordDetails: {
    title: string
    category: string
    permissions: string
    creationDate: string
    creationTime: string
    author: string
    sharingLink?: string
  }
}

export default function PasswordDetailsModal({
  isOpen,
  onClose,
  position,
  passwordDetails,
}: PasswordDetailsModalProps) {
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

  // Adjust position for mobile screens
  useEffect(() => {
    if (modalRef.current && isOpen) {
      const rect = modalRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Check if modal is outside viewport
      if (rect.right > viewportWidth) {
        const newLeft = Math.max(5, viewportWidth - rect.width - 5)
        modalRef.current.style.left = `${newLeft}px`
      }

      if (rect.bottom > viewportHeight) {
        const newTop = Math.max(5, viewportHeight - rect.height - 5)
        modalRef.current.style.top = `${newTop}px`
      }
    }
  }, [isOpen, position])

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className="fixed z-50 bg-[#1a1a1a] rounded-md shadow-lg border border-gray-700 w-72 md:w-80 overflow-hidden"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-white text-base font-medium">Informação da senha</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-gray-400 text-sm">Título:</p>
            <p className="text-white">{passwordDetails.title}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Categoria:</p>
            <p className="text-white">{passwordDetails.category}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Permissões Da Senha:</p>
            <p className="text-white">{passwordDetails.permissions}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Data Da Criação:</p>
            <p className="text-white">{passwordDetails.creationDate}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Hora Da Criação:</p>
            <p className="text-white">{passwordDetails.creationTime}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Autor:</p>
            <p className="text-white">{passwordDetails.author}</p>
          </div>
        </div>

        {passwordDetails.sharingLink && (
          <>
            <div className="my-4 border-t border-gray-700"></div>
            <div>
              <h4 className="text-white text-sm font-medium mb-2">Link de Compartilhamento</h4>
              <div className="flex items-center bg-[#2a2a2a] rounded p-2">
                <LinkIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                <p className="text-[#58beee] text-sm truncate">{passwordDetails.sharingLink}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

"use client"

import { Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"

interface CopyToastProps {
  text: string
}

export default function CopyToast({ text }: CopyToastProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCopied(true)
    const timeout = setTimeout(() => setCopied(false), 1000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-400" />}
      <span>{text}</span>
    </div>
  )
}

"use client";

import { useState } from "react";

import {
  Calendar,
  Clock,
  Copy,
  Eye,
  EyeOff,
  LinkIcon,
  Shield,
  User,
} from "lucide-react";
import { toast } from "sonner";

import ItemDetailsPanelSkeleton from "./item-details-panel-skeleton";
import { NoItem } from "./no-item";

interface ItemDetailsPanelProps {
  selectedPassword: {
    id: string;
    name: string;
    iconUrl?: string;
    user?: string;
    status?: string;
    color?: string;
    url?: string;
    username?: string;
    password?: string;
    notes?: string;
    createdAt?: string;
    category?: string;
    isShared?: boolean;
  } | null;
  isLoading?: boolean;
}

export default function ItemDetailsPanel({
  selectedPassword,
  isLoading = false,
}: ItemDetailsPanelProps) {
  const [showPassword, setShowPassword] = useState(false);

  if (isLoading) {
    return <ItemDetailsPanelSkeleton />;
  }

  if (!selectedPassword) {
    return (
      <NoItem
        title="Nenhum Item Selecionado!"
        subtitle="Selecione um item para ver seus detalhes."
      />
    );
  }

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text || "");

    toast.success(`${type} copiado`, {
      duration: 2000,
      className: "bg-[#1a1a1a] border-gray-700 py-1.5 px-3 text-sm",
      position: "bottom-center",
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-800 flex items-center">
        <div
          className={`w-10 h-10 rounded-md flex items-center justify-center mr-3 ${
            selectedPassword.color || "bg-gray-600"
          }`}
        >
          {selectedPassword.iconUrl ? (
            <img
              src={selectedPassword.iconUrl || "/placeholder.svg"}
              alt={selectedPassword.name}
              width={24}
              height={24}
              className="object-contain"
            />
          ) : (
            <span className="text-white text-lg font-bold">
              {selectedPassword.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h2 className="text-lg font-medium text-white">
            {selectedPassword.name}
          </h2>
          <p className="text-sm text-gray-400">
            {selectedPassword.status || "senha privada"}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        <div className="mb-6">
          <h3 className="text-sm text-gray-400 mb-2 flex items-center">
            <LinkIcon className="h-4 w-4 mr-2" />
            URL
          </h3>
          <div className="flex items-center bg-[#2a2a2a] rounded p-2">
            <p className="text-white text-sm flex-1 truncate">
              {selectedPassword.url ||
                `https://${selectedPassword.name.toLowerCase()}.com`}
            </p>
            <button
              className="text-gray-400 hover:text-white p-1"
              onClick={() =>
                handleCopyToClipboard(
                  selectedPassword.url ||
                    `https://${selectedPassword.name.toLowerCase()}.com`,
                  "URL"
                )
              }
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm text-gray-400 mb-2 flex items-center">
            <User className="h-4 w-4 mr-2" />
            Nome de usuário
          </h3>
          <div className="flex items-center bg-[#2a2a2a] rounded p-2">
            <p className="text-white text-sm flex-1 truncate">
              {selectedPassword.username ||
                selectedPassword.user ||
                "usuario@email.com"}
            </p>
            <button
              className="text-gray-400 hover:text-white p-1"
              onClick={() =>
                handleCopyToClipboard(
                  selectedPassword.username ||
                    selectedPassword.user ||
                    "usuario@email.com",
                  "Nome de usuário"
                )
              }
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm text-gray-400 mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Senha
          </h3>
          <div className="flex items-center bg-[#2a2a2a] rounded p-2">
            <p className="text-white text-sm flex-1 truncate">
              {showPassword
                ? selectedPassword.password || "********"
                : "••••••••"}
            </p>
            <button
              className="text-gray-400 hover:text-white p-1 mr-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
            <button
              className="text-gray-400 hover:text-white p-1"
              onClick={() =>
                handleCopyToClipboard(
                  selectedPassword.password || "********",
                  "Senha"
                )
              }
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm text-gray-400 mb-2">Notas</h3>
          <div className="bg-[#2a2a2a] rounded p-3">
            <p className="text-white text-sm">
              {selectedPassword.notes || "Nenhuma nota adicionada."}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-400">Criado em:</span>
            <span className="text-white ml-2">
              {selectedPassword.createdAt || "03/04/2025"}
            </span>
          </div>

          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-400">Última modificação:</span>
            <span className="text-white ml-2">03/04/2025</span>
          </div>

          {selectedPassword.isShared && (
            <div className="flex items-center text-sm">
              <LinkIcon className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-gray-400">Compartilhado com:</span>
              <span className="text-white ml-2">3 pessoas</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

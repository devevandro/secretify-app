"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotCodePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending new code
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Redirect back to verify page after showing success message
      setTimeout(() => {
        navigate("/verify");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1520] to-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-[#0c1824] to-[#0a141e] rounded-2xl overflow-hidden custom-scrollbar shadow-2xl p-8">
        <Link
          to="/verify"
          className="flex items-center text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Voltar</span>
        </Link>

        <h1 className="text-2xl font-bold text-white mb-4">
          Reenviar código de segurança
        </h1>

        <p className="text-gray-400 mb-6 text-sm">
          Insira seu endereço de e-mail e enviaremos um novo código de
          segurança.
        </p>

        {isSuccess ? (
          <div className="bg-green-900 bg-opacity-20 border border-green-800 rounded-lg p-4 mb-6">
            <p className="text-green-400 text-sm">
              Um novo código de segurança foi enviado para seu e-mail. Você será
              redirecionado em instantes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-400 mb-1"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu endereço de e-mail"
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#3b9bff] focus:ring-1 focus:ring-[#3b9bff]"
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isSubmitting || !email
                  ? "bg-blue-800 text-gray-300 cursor-not-allowed"
                  : "bg-[#3b9bff] hover:bg-[#2a8aee] text-white"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>ENVIANDO...</span>
                </div>
              ) : (
                "ENVIAR NOVO CÓDIGO"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

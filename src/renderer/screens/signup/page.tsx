"use client";

import type React from "react";

import { useState } from "react";

import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup with email:", email);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1520] to-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-gradient-to-br from-[#0c1824] to-[#0a141e] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Left side - Logo */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
            <img
              src="/secretfy-shield.svg"
              alt="Secretfy Logo"
              className="object-contain"
            />
          </div>
          <div className="relative w-64 h-20 md:w-80 md:h-24">
            <img
              src="/secretfy-text.svg"
              alt="Secretfy"
              className="object-contain"
            />
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Crie sua conta no <span className="text-[#3b9bff]">Secretfy</span>,
            seu cofre digital sempre seguro.
          </h1>

          <p className="text-gray-400 mb-8 text-sm md:text-base">
            Secretfy desktop é uma plataforma de segurança digital, que oferece
            uma maneira simples e eficaz de proteger, e armazenar suas senhas.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Insira o endereço de e-mail"
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#3b9bff] focus:ring-1 focus:ring-[#3b9bff] pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3b9bff] hover:bg-[#2a8aee] text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
            >
              <span>CRIAR CONTA GRÁTIS</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>

          <div className="mt-6 text-xs text-gray-500">
            Ao se inscrever, você concorda com os{" "}
            <Link to="/terms" className="text-[#3b9bff] hover:underline">
              Termos de Serviço
            </Link>{" "}
            e a{" "}
            <Link to="/privacy" className="text-[#3b9bff] hover:underline">
              Política de Privacidade
            </Link>
            , incluindo o{" "}
            <Link to="/cookies" className="text-[#3b9bff] hover:underline">
              Uso de Cookies
            </Link>
            .
          </div>

          <div className="mt-6 text-sm text-gray-400">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-[#3b9bff] hover:underline font-medium"
            >
              fazer login
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

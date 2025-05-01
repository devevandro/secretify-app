"use client";

import type React from "react";

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "renderer/components/header";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending verification code
    setTimeout(() => {
      // Redirect to verification page
      navigate("/verify");
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1520] to-[#000000] flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-gradient-to-br from-[#0c1824] to-[#000000] rounded-2xl overflow-hidden custom-scrollbar shadow-2xl flex flex-col md:flex-row">
          {/* Left side - Logo */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 md:w-80 md:h-80 mb-6">
              <img
                src="/img/logo.png"
                alt="Secretfy Logo"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Bem Vindo ao <span className="text-[#3b9bff]">Secretfy</span>, seu
              cofre digital sempre seguro.
            </h1>

            <p className="text-gray-400 text-justify mb-8 text-sm md:text-base">
              Secretfy desktop é uma plataforma de segurança digital, que
              oferece uma maneira simples e eficaz de proteger, e armazenar suas
              senhas.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Insira o endereço de e-mail"
                  className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#3b9bff] focus:ring-1 focus:ring-[#3b9bff]"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !email}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center transition-colors ${
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
                  <>
                    <span>CONTINUAR COM ENDEREÇO DE E-MAIL</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
            <div className="mt-3 text-xs text-gray-500">
              <Link to="/signup" className="text-[#3b9bff] hover:underline">
                Criar conta grátis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

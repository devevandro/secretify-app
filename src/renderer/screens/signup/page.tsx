"use client";

import type React from "react";

import { useState } from "react";

import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import Header from "renderer/components/header";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup with email:", email);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1520] to-[#000000] flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-gradient-to-br from-[#0c1824] to-[#000000] rounded-2xl overflow-hidden custom-scrollbar shadow-2xl flex flex-col md:flex-row">
          {/* Left side - Logo */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center">
            <div className="relative w-48 h-48 md:w-48 md:h-48 mb-6">
              <img
                src="/img/logo.png"
                alt="Secretfy Logo"
                className="object-contain"
              />
            </div>

            <div className="text-white font-bold mb-4 text-sm md:text-base">
              <p>O que te espera ao criar sua conta no secretfy</p>
            </div>
            <div className="flex mb-8">
              <div className="w-64 flex-auto mr-5">
                <div className="relative mb-1">
                  <img
                    src="/svg/security.svg"
                    alt=""
                    className="object-contain"
                  />
                </div>
                <div className="text-white font-bold mb-1 text-lg md:text-base">
                  <p>Segurança reforçada</p>
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  <p>
                    suas senhas serão protegidas com os mais altos padrões de
                    segurança.
                  </p>
                </div>
              </div>
              <div className="w-64 flex-auto">
                <div className="relative mb-1">
                  <img
                    src="/svg/facility.svg"
                    alt=""
                    className="object-contain"
                  />
                </div>
                <div className="text-white font-bold mb-1 text-lg md:text-base">
                  <p>Facilidade de uso</p>
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  <p>
                    um processo simples e rápido de criação para começar a usar.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="w-64 flex-auto mr-5">
                <div className="relative mb-1">
                  <img
                    src="/svg/control.svg"
                    alt=""
                    className="object-contain"
                  />
                </div>
                <div className="text-white font-bold mb-1 text-lg md:text-base">
                  <p>Controle total</p>
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  <p>
                    Você terá o controle total sobre suas senhas, de forma
                    rápida e segura.
                  </p>
                </div>
              </div>
              <div className="w-64 flex-auto">
                <div className="relative mb-1">
                  <img
                    src="/svg/tranquility.svg"
                    alt=""
                    className="object-contain"
                  />
                </div>
                <div className="text-white font-bold mb-1 text-lg md:text-base">
                  <p>Tranquilidade</p>
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  <p>Diga adeus a preocupação de esquecer senhas.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Crie sua conta no <span className="text-[#3b9bff]">Secretfy</span>
              , seu cofre digital sempre seguro.
            </h1>

            <p className="text-gray-400 mb-8 text-sm md:text-base">
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
                  className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#3b9bff] focus:ring-1 focus:ring-[#3b9bff] pr-10"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#3b9bff] hover:bg-[#2a8aee] text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
              >
                <span>PROSSEGUIR</span>
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

            <div className="mt-3 text-sm text-gray-400">
              Já possui conta?{" "}
              <Link
                to="/"
                className="text-[#3b9bff] hover:underline font-medium"
              >
                Fazer Login
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

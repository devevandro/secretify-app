"use client";

import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Header from "renderer/components/header/header";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      navigate("/verify");
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1520] to-[#000000] flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-gradient-to-br from-[#0c1824] to-[#000000] rounded-2xl overflow-hidden custom-scrollbar shadow-2xl flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 md:w-80 md:h-80 mb-6">
              <img
                src="/img/logo.png"
                alt="Secretfy Logo"
                className="object-contain"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-2xl text-center md:text-3xl font-bold text-white mb-2">
              Bom ver você novamente!
            </h1>

            <p className="text-[#8F8F8F] text-left mb-6 text-sm md:text-base">
              Que bom que já está de volta! Continue aproveitando o seu
              Secretify.
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
                    ? "bg-[#1787c1] text-gray-100 cursor-not-allowed opacity-42"
                    : "bg-gradient-to-bl from-[#58BFF5] to-[#0B5A85] hover:bg-[#2a8aee] text-white cursor-pointer"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>ENVIANDO...</span>
                  </div>
                ) : (
                  <>
                    <span>ACESSAR</span>
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

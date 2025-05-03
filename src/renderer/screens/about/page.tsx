"use client";

import { Shield, Smile, Gamepad2, Coffee } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1520] to-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gradient-to-br from-[#0c1824] to-[#0a141e] rounded-2xl overflow-hidden custom-scrollbar shadow-2xl p-8 md:p-12">
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-32 h-32 mb-4">
            <img
              src="/secretfy-shield.svg"
              alt="Secretfy Logo"
              className="object-contain"
            />
          </div>
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold mb-2">
              Secret<span className="text-[#58beee]">fy</span>
            </h1>
          </div>
        </div>

        <h2 className="text-white text-xl font-medium mb-8 text-center">
          O que te espera ao criar sua conta no secretfy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Security Feature */}
          <div className="flex flex-col">
            <div className="flex items-center mb-3">
              <div className="text-[#58beee] mr-3">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-white text-lg font-medium">
                Segurança reforçada
              </h3>
            </div>
            <p className="text-gray-400">
              suas senhas serão protegidas com os mais altos padrões de
              segurança.
            </p>
          </div>

          {/* Ease of Use Feature */}
          <div className="flex flex-col">
            <div className="flex items-center mb-3">
              <div className="text-[#58beee] mr-3">
                <Smile className="h-7 w-7" />
              </div>
              <h3 className="text-white text-lg font-medium">
                Facilidade de uso
              </h3>
            </div>
            <p className="text-gray-400">
              um processo simples e rápido de criação para começar a usar.
            </p>
          </div>

          {/* Total Control Feature */}
          <div className="flex flex-col">
            <div className="flex items-center mb-3">
              <div className="text-[#58beee] mr-3">
                <Gamepad2 className="h-7 w-7" />
              </div>
              <h3 className="text-white text-lg font-medium">Controle total</h3>
            </div>
            <p className="text-gray-400">
              Você terá o controle total sobre suas senhas, de forma rápida e
              segura.
            </p>
          </div>

          {/* Peace of Mind Feature */}
          <div className="flex flex-col">
            <div className="flex items-center mb-3">
              <div className="text-[#58beee] mr-3">
                <Coffee className="h-7 w-7" />
              </div>
              <h3 className="text-white text-lg font-medium">Tranquilidade</h3>
            </div>
            <p className="text-gray-400">
              Diga adeus à preocupação de esquecer senhas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

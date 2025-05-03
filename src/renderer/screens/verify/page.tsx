"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import Header from "renderer/components/header/header";
import { toast, Toaster } from "sonner";

export default function VerifyPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6 && !isSubmitting) {
      handleSubmit();
    }
  }, [code, isSubmitting]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setCode(digits);

      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = () => {
    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      return;
    }

    setIsSubmitting(true);

    if (verificationCode === "111111") {
      setTimeout(() => {
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsInvalid(true);

        toast.error("Código de segurança inválido", {
          description: "Por favor, verifique o código e tente novamente.",
          duration: 4000,
        });

        setTimeout(() => {
          setCode(Array(6).fill(""));
          setIsInvalid(false);
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }, 1500);
      }, 1000);
    }
  };

  const handleClose = () => {
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div className="fixed inset-0 bg-[#121212] bg-opacity-90 flex items-center justify-center p-4 z-50">
        {
          <div className="w-full max-w-md bg-gradient-to-br from-[#063147] to-[#040404] rounded-lg shadow-xl p-6 relative">
            <h2 className="text-xl text-white font-medium mb-6 text-center">
              Insira o código de segurança
            </h2>

            <div>
              <div className="flex justify-between mb-6">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className={`w-12 h-16 border ${
                      isInvalid
                        ? "border-red-500"
                        : code[index]
                        ? "border-gray-600"
                        : index === 0 && !code[0]
                        ? "border-[#58bff5]"
                        : "border-gray-700"
                    } rounded-md flex items-center justify-center`}
                  >
                    <input
                      ref={(el: any) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={code[index] || ""}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-full h-full bg-transparent text-center text-xl text-white focus:outline-none"
                      aria-label={`Digit ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <button
                disabled={true}
                className={`w-full py-3 rounded-md text-white font-medium transition-colors cursor-not-allowed ${
                  !isSubmitting
                    ? "bg-[#1787c1] text-gray-100 cursor-not-allowed opacity-42"
                    : "bg-gradient-to-bl from-[#58BFF5] to-[#0B5A85] hover:bg-[#2a8aee] text-white"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>ACESSANDO...</span>
                  </div>
                ) : (
                  <>
                    <span>CONFIRMAR CÓDIGO</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 text-center text-[#8f8f8f] text-sm">
              Acesse o dispositivo cadastrado e informe o código
            </div>
          </div>
        }
        {/* Toast notifications */}
        <Toaster position="bottom-center" closeButton richColors theme="dark" />
      </div>
    </>
  );
}

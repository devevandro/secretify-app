"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { Toaster } from "sonner";

export default function VerifyPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVaultAnimation, setShowVaultAnimation] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Auto-submit when all 6 digits are entered
  useEffect(() => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6 && !isSubmitting) {
      handleSubmit();
    }
  }, [code, isSubmitting]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);

    // Auto-focus to next input if current input is filled
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
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

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setCode(digits);

      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = () => {
    const verificationCode = code.join("");

    // Check if code is complete
    if (verificationCode.length !== 6) {
      return;
    }

    setIsSubmitting(true);

    // For demo purposes, let's consider "123456" as the valid code
    // In a real app, this would be validated against an API
    if (verificationCode === "111111") {
      // Show vault animation after a short delay
      setTimeout(() => {
        setShowVaultAnimation(true);

        // Redirect to dashboard after animation completes
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000); // Animation takes 2.5s, add a bit extra for smoothness
      }, 1000);
    } else {
      // Invalid code handling
      setTimeout(() => {
        setIsSubmitting(false);
        setIsInvalid(true);

        // Show error toast
        toast.error("Código de segurança inválido", {
          description: "Por favor, verifique o código e tente novamente.",
          duration: 4000
        });

        // Reset form after a short delay
        setTimeout(() => {
          setCode(Array(6).fill(""));
          setIsInvalid(false);
          // Focus the first input again
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }, 1500);
      }, 1000); // Simulate server validation delay
    }
  };

  const handleClose = () => {
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      {
        <div className="w-full max-w-md bg-[#0c1824] rounded-lg shadow-xl p-6 relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>

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
                      ? "border-[#3b9bff]"
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
              className="w-full py-3 rounded-md text-white font-medium transition-colors bg-blue-800 cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>ACESSANDO...</span>
                </div>
              ) : (
                "CONFIRMAR CÓDIGO"
              )}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/forgot-code"
              className="text-[#3b9bff] hover:underline text-sm"
            >
              não recebeu seu código? clique aqui para reenviar
            </Link>
          </div>
        </div>
      }
      {/* Toast notifications */}
      <Toaster position="bottom-center" closeButton richColors theme="dark" />
    </div>
  );
}

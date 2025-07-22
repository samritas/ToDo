import { useState, useEffect } from "react";

import { AlertTriangle, X } from "lucide-react";
import { Button } from "./button";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
}: ConfirmationModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(onConfirm, 300);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 w-full max-w-md shadow-2xl transition-all duration-500 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        }`}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {title}
            </h2>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5 text-white/60 hover:text-white" />
          </button>
        </div>

        <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleConfirm}
            variant="primary"
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-red-500/50 hover:border-red-400/50 shadow-lg shadow-red-500/20 hover:shadow-red-500/30"
          >
            {confirmText}
          </Button>

          <Button
            onClick={handleCancel}
            variant="secondary"
            className="flex-1 sm:flex-none px-6"
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
}

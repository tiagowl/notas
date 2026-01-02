import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <XCircle className="w-5 h-5 text-error" />,
    info: <Info className="w-5 h-5 text-info" />,
    warning: <AlertCircle className="w-5 h-5 text-warning" />,
  };

  const borderColors = {
    success: 'border-l-success',
    error: 'border-l-error',
    info: 'border-l-info',
    warning: 'border-l-warning',
  };

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50
        bg-white rounded-lg shadow-lg
        border-l-4 ${borderColors[type]}
        p-4 min-w-[300px] max-w-[500px]
        animate-in slide-in-from-bottom-5 duration-300
        flex items-start gap-3
      `}
      role="alert"
    >
      {icons[type]}
      <p className="flex-1 text-sm text-gray-700">{message}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Fechar notificação"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};








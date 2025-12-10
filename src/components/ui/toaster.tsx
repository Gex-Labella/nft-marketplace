import React, { useState, useEffect } from "react";

export type ToastProps = {
  id: string;
  title?: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
};

interface ToasterContextType {
  toast: (props: Omit<ToastProps, "id">) => void;
}

const ToasterContext = React.createContext<ToasterContextType | undefined>(
  undefined
);

export function useToast() {
  const context = React.useContext(ToasterContext);
  if (!context) {
    throw new Error("useToast must be used within a ToasterProvider");
  }
  return context;
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = React.useCallback(
    (props: Omit<ToastProps, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prevToasts) => [...prevToasts, { id, ...props }]);
    },
    [setToasts]
  );

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToasterContext.Provider value={{ toast }}>
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToasterContext.Provider>
  );
}

function Toast({
  id,
  title,
  message,
  type = "info",
  onClose,
}: ToastProps & { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`${bgColors[type]} bg-opacity-90 text-white p-4 rounded-lg shadow-lg flex flex-col`}
      role="alert"
    >
      <div className="flex justify-between items-start">
        {title && <h4 className="font-medium">{title}</h4>}
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          &times;
        </button>
      </div>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
}

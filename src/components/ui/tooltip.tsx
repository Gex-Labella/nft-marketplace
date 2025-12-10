import React, { useState } from "react";

interface TooltipProviderProps {
  children: React.ReactNode;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
}) => {
  return <>{children}</>;
};

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>

      {show && (
        <div className="absolute z-10 px-3 py-2 text-sm text-white bg-dark-lighter rounded-md shadow-lg -mt-1 -translate-y-full opacity-100 top-0">
          {content}
          <div className="absolute w-2 h-2 bg-dark-lighter transform rotate-45 translate-x-1/2 bottom-0 right-1/2"></div>
        </div>
      )}
    </div>
  );
}

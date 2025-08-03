import type React from "react";
import { useEffect, useRef } from "react";

interface CustomDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  const CustomdropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        CustomdropdownRef.current &&
        !CustomdropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".Customdropdown-toggle")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={CustomdropdownRef}
      className={`z-40 right-0 mt-2  rounded-xl border border-gray-200 bg-white  shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
    >
      {children}
    </div>
  );
};

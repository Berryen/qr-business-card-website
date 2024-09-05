import React, { useEffect, useState } from "react";

interface AlertPopupProps {
  text: string;
  onClose: () => void;
}

export const AlertPopup: React.FC<AlertPopupProps> = ({ text, onClose }) => {
  // ================= STATE
  const [visible, setVisible] = useState(true);

  // ================= EFFECTS
  useEffect(() => {
    setVisible(true); // Set visible to true when text changes

    const timeoutId = setTimeout(() => {
      setVisible(false);
      onClose(); // Optionally call onClose when the alert disappears
    }, 3000);

    return () => clearTimeout(timeoutId); // Cleanup on unmount or when text changes
  }, [text, onClose]);

  return (
    <div
      className={`alert-popup
      fixed bottom-3 sm:bottom-auto sm:top-10 sm:right-10 text-xs sm:text-sm text-white bg-green-500 p-2 sm:p-3 rounded-xl bg-opacity-60
      ${visible ? "visible" : ""}`}
    >
      <p>{text}</p>
    </div>
  );
};

export default AlertPopup;

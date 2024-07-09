import React from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {children}
        <button onClick={onClose} className="btn btn-secondary mt-4">
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
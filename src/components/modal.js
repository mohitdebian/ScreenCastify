// src/components/modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-transparent p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
    
<button
  className="absolute top-3 right-4 text-red-600 font-bold text-2xl" // Set text color to red, make it bold, and increase font size
  onClick={onClose}
>
  X
</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

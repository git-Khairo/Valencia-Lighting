// Components/Modal.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, type, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
        {(type === 'success' || type === 'error') && (
          <div className="flex justify-center mb-4">
            <FontAwesomeIcon
              icon={type === 'success' ? faCheckCircle : faTimesCircle}
              className={`text-4xl ${type === 'success' ? 'text-green-500' : 'text-red-500'}`}
            />
          </div>
        )}
        <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">{title}</h2>
        <p className="text-gray-700 mb-6 text-center">{message}</p>
        <div className="flex justify-center gap-3">
          {cancelText && (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded text-white ${
              type === 'delete'
                ? 'bg-red-600 hover:bg-red-700'
                : type === 'confirmSubmit'
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : type === 'success'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Reusable Modal component
const Modal = ({ isOpen, onClose, children, title, refProp, maxWidth = 'max-w-lg' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 transition-opacity duration-200">
      <div
        ref={refProp}
        className={`bg-white dark:bg-dark-secondary rounded-lg p-6 w-full ${maxWidth} shadow-lg transition-all duration-200 ease-in-out opacity-0 translate-y-[-20px] overflow-y-auto max-h-[80vh]`}
        style={isOpen ? { opacity: 1, translateY: '0' } : {}}
      >
        {title && (
          <h3 className="text-xl font-semibold mb-6 text-light-text dark:text-dark-text">{title}</h3>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
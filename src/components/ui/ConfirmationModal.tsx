import React from 'react';
import './ConfirmationModal.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  siteName?: string;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  siteName,
  title,
  message,
  confirmText,
  cancelText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title || 'تایید'}</h3>
        </div>
        <div className="modal-body">
          <p>
            {message || (
              <>
                درحال باز کردن <strong>{siteName}</strong> هستید، آیا ادامه میدهید؟
              </>
            )}
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onCancel}>{cancelText || 'انصراف'}</button>
          <button className="btn-confirm" onClick={onConfirm}>{confirmText || 'تایید'}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; 
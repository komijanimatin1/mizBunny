import React from 'react';
import './ConfirmationModal.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  siteName: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  siteName
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>تایید باز کردن</h3>
        </div>
        <div className="modal-body">
          <p>درحال باز کردن <strong>{siteName}</strong> هستید، آیا ادامه میدهید؟</p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onCancel}>
            انصراف
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            تایید
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; 
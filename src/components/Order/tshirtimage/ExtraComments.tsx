import React, { useState } from "react";

interface ExtraCommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExtraComments: React.FC<ExtraCommentsModalProps> = ({ isOpen, onClose, }) => {
  const [comment, setComment] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <textarea
            value={comment}
            onChange={handleInputChange}
            placeholder="Enter your comments here..."
            className="comment-input"
          />
        </div>
      </div>
    </div>
  );
};

export default ExtraComments;

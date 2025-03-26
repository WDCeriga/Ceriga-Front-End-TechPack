import React, { useState } from "react";

interface ExtraCommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveComment: (comment: string) => void;
}

const ExtraComments: React.FC<ExtraCommentsModalProps> = ({ isOpen, onClose, onSaveComment }) => {
  const [comment, setComment] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

//   const handleSave = () => {
//     onSaveComment(comment); // Pass the comment to the parent component
//     onClose(); // Close the modal after saving
//   };

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
        {/* <div className="modal-footer">
          <button onClick={handleSave} className="save-btn">Save</button>
        </div> */}
      </div>
    </div>
  );
};

export default ExtraComments;

import React, { useState, useEffect, useRef } from "react";

import { AppDispatch, RootState } from "@redux/store";
import { useDispatch, useSelector } from "react-redux";

import { changelogodescription } from "@redux/slices/order";
interface ExtraCommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExtraComments: React.FC<ExtraCommentsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { description } = useSelector(
    (state: RootState) => state.order.logodetails
  );

  console.log("description===>", description)
  const [comment, setComment] = useState<string>(
    description ? description.toString() : ""
  );
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        dispatch(changelogodescription(comment));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch ,onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // if (!isOpen) return null;

  return (
    <div ref={containerRef} className="modal-overlay" onClick={onClose}>
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

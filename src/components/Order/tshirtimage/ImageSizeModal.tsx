import React, { useEffect } from 'react';
import './imagesizemodal.scss';

interface ImageSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSelectedSize: (size: string) => void;
  selectedSize: string | null;
}

const ImageSizeModal: React.FC<ImageSizeModalProps> = ({
  isOpen,
  onClose,
  setSelectedSize,
  selectedSize,
}) => {
  const sizes = [
    { label: '10x10', value: '10x10' },
    { label: '25x15', value: '25x15' },
    { label: '30x20', value: '30x20' },
    { label: '30x30', value: '30x30' },
    { label: '30x40', value: '30x40' },
    { label: '40x50', value: '40x50' },
    { label: '200x200', value: '200x200' },
  ];

  // Set default selected size to '220x220' if not already set
  useEffect(() => {
    if (!selectedSize) {
      setSelectedSize('200x200');
    }
  }, [selectedSize, setSelectedSize]);

  const handleRowClick = (size: string): void => {
    setSelectedSize(size);
    onClose();  // Close the modal after selecting a size
  };

  const chunkSizes = (sizes: { label: string; value: string }[]) => {
    let result = [];
    for (let i = 0; i < sizes.length; i += 3) {
      result.push(sizes.slice(i, i + 3));
    }
    return result;
  };
  const chunkedSizes = chunkSizes(sizes);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <table className="size-table">
          <thead>
            <tr>
              <th>Small</th>
              <th>Medium</th>
              <th>Large</th>
            </tr>
          </thead>
          <tbody>
            {chunkedSizes.map((chunk, index) => (
              <tr key={index}>
                {chunk.map((size) => (
                  <td
                    key={size.value}
                    onClick={() => handleRowClick(size.value)}
                    className={`clickable-size ${selectedSize === size.value ? 'selected' : ''}`}
                  >
                    {size.label}
                  </td>
                ))}
                {chunk.length < 3 &&
                  Array.from({ length: 3 - chunk.length }).map((_, i) => (
                    <td key={i}></td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImageSizeModal;

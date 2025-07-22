import Cropper from 'react-easy-crop';
import { useState } from 'react';
import { getCroppedImg } from './cropImageUtils';

export const ImageCropModal = ({ file, onClose, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const imageUrl = URL.createObjectURL(file);
  const handleCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleDone = async () => {
    const imageDataUrl = await getCroppedImg(
      URL.createObjectURL(file),
      croppedAreaPixels
    );
    const blob = await fetch(imageDataUrl).then((res) => res.blob());
    const croppedFile = new File([blob], file.name, { type: file.type });
    onCropDone(imageDataUrl, croppedFile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full relative">
        <div className="relative w-full h-80">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Отмена
          </button>
          <button
            onClick={handleDone}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Обрезать
          </button>
        </div>
      </div>
    </div>
  );
};

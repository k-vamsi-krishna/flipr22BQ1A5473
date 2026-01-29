
import React, { useState, useCallback } from 'react';
import Cropper, { Point, Area } from 'react-easy-crop';

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ image, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = (crop: Point) => setCrop(crop);
  const onZoomChange = (zoom: number) => setZoom(zoom);

  const handleCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const createCroppedImage = async () => {
    if (!croppedAreaPixels) return;

    const img = new Image();
    img.src = image;
    await new Promise(resolve => img.onload = resolve);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 450;
    canvas.height = 350;

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      450,
      350
    );

    onCropComplete(canvas.toDataURL('image/jpeg'));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-2xl h-[400px] mb-8">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={450 / 350}
          onCropChange={onCropChange}
          onCropComplete={handleCropComplete}
          onZoomChange={onZoomChange}
        />
      </div>
      
      <div className="w-full max-w-md space-y-6">
        <div className="px-4">
          <label className="block text-white text-sm mb-2">Zoom</label>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onCancel}
            className="flex-1 bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 font-bold transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={createCroppedImage}
            className="flex-1 bg-accent text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-bold shadow-lg transition-all"
          >
            Crop & Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;

// Utility script import for dependencies we'll need for this component
// Normally these would be in package.json but we'll assume the environment has standard React tools
// Since we cannot add new script tags here easily, we'll try to use standard browser APIs or libraries if they exist.
// For this task, I'm using react-easy-crop, assuming it's available.

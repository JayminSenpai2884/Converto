'use client';  // Add this line at the top of the file

import { useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';

const ImageConverter = () => {
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageConvert = useCallback(async (file: File) => {
    setIsConverting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to convert image');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setConvertedImage(url);
    } catch (error) {
      console.error('Error converting image:', error);
      setError('Failed to convert image. Please try again.');
    } finally {
      setIsConverting(false);
    }
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageConvert(file);
    }
  };

  return (
    <div className="image-converter">
      <h2>Image Converter</h2>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        disabled={isConverting}
      />
      {isConverting && <p>Converting image...</p>}
      {error && <p className="error">{error}</p>}
      {convertedImage && (
        <div className="converted-image">
          <h3>Converted Image:</h3>
          <img src={convertedImage} alt="Converted" />
          <a href={convertedImage} download="converted-image.webp">Download Converted Image</a>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;


import React, { useState, useRef, DragEvent } from 'react';
import UploadIcon from './components/UploadIcon';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (selectedFile: File) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (selectedFile && (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/'))) {
      setFile(selectedFile);
      const newPreviewUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(newPreviewUrl);
    } else {
      // Optional: handle invalid file type
      setFile(null);
      setPreviewUrl(null);
      alert('Please upload a valid image or video file.');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen min-h-screen p-4 overflow-y-auto bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-900 text-white font-sans">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-indigo-300">
            Creative Studio
          </h1>
          <p className="max-w-md mx-auto mt-4 text-lg text-slate-400 md:text-xl">
            Upload an image or video to get started.
          </p>
        </div>

        {!previewUrl ? (
          <div
            onClick={handleAreaClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center w-full h-64 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 ${isDragging ? 'border-indigo-400 bg-indigo-900/20' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/20'}`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="sr-only"
            />
            <div className="space-y-4 text-slate-400">
              <UploadIcon className="w-16 h-16 mx-auto" />
              <p className="text-lg">
                <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm">PNG, JPG, GIF, MP4, WEBM</p>
            </div>
          </div>
        ) : (
          <div className="relative w-full bg-black rounded-xl shadow-2xl overflow-hidden">
            {file?.type.startsWith('image/') ? (
              <img src={previewUrl} alt="Selected preview" className="w-full max-h-[60vh] object-contain" />
            ) : (
              <video src={previewUrl} controls autoPlay loop muted className="w-full max-h-[60vh] object-contain" />
            )}
             <button
              onClick={() => { setFile(null); setPreviewUrl(null); if (previewUrl) URL.revokeObjectURL(previewUrl); }}
              className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
              aria-label="Remove file"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <button
          type="button"
          disabled={!file}
          className="w-full max-w-md py-3 px-6 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
        >
          Upload Media
        </button>
      </div>

      <footer className="mt-auto pt-8 text-sm text-slate-600">
        © {new Date().getFullYear()} Our Company. All Rights Reserved.
      </footer>
    </main>
  );
}

export default App;

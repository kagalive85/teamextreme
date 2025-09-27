
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

const UploadSection: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    // Future: handle file drop logic
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log(e.dataTransfer.files);
      // reset the input
      e.dataTransfer.clearData();
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files && e.target.files.length > 0) {
        console.log(e.target.files);
     }
  };

  return (
    <section className="w-full">
      <div 
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative group border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all duration-300 ease-in-out ${
          isDragging ? 'border-brand-primary bg-slate-800/50 scale-105' : 'border-slate-700 hover:border-brand-secondary'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>
        <div className="relative">
          <div className="flex justify-center mb-6">
            <UploadIcon className={`w-16 h-16 transition-transform duration-300 ${isDragging ? 'text-brand-primary scale-110' : 'text-slate-600 group-hover:text-brand-secondary'}`} />
          </div>
          <h3 className="text-xl font-semibold text-slate-100">
            Drag & drop files here
          </h3>
          <p className="mt-2 text-slate-400">
            or <span className="font-medium text-brand-light cursor-pointer" onClick={() => document.getElementById('file-upload')?.click()}>click to browse</span>
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Supports: JPG, PNG, GIF, MP4, MOV (Max 100MB)
          </p>
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            multiple 
            onChange={handleFileChange}
          />
        </div>
      </div>
    </section>
  );
};

export default UploadSection;


import React, { useState, useRef, useCallback } from 'react';
import { Icon } from './Icon.tsx';
import { UploadStatus, IconName } from '../types.ts';

interface FileUploadProps {
  fileType: string;
  accept: string;
  icon: IconName;
}

const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const FileUpload: React.FC<FileUploadProps> = ({ fileType, accept, icon }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setStatus('selected');
    }
  };

  const handleUpload = useCallback(() => {
    if (!file) return;
    setStatus('uploading');
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('success');
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(prev + diff, 100);
      });
    }, 200);
  }, [file]);

  const handleReset = () => {
    setFile(null);
    setStatus('idle');
    setUploadProgress(0);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  
  const triggerFileSelect = () => inputRef.current?.click();

  const renderContent = () => {
    switch (status) {
      case 'idle':
        return (
          <div className="text-center cursor-pointer" onClick={triggerFileSelect}>
            <Icon name="UploadCloud" className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Any {fileType.toLowerCase()} file</p>
          </div>
        );
      case 'selected':
        return (
          <div className="text-center">
            <Icon name="File" className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{file?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{file ? formatBytes(file.size) : ''}</p>
            <div className="mt-4 flex justify-center gap-2">
                <button onClick={handleUpload} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-all">
                  Upload File
                </button>
                <button onClick={handleReset} className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none transition-all">
                  Cancel
                </button>
            </div>
          </div>
        );
      case 'uploading':
        return (
          <div className="w-full">
            <p className="text-sm font-medium text-center text-slate-700 dark:text-slate-300 mb-2">Uploading...</p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-300 ease-linear"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-center text-xs mt-2 text-slate-500 dark:text-slate-400">{Math.round(uploadProgress)}%</p>
          </div>
        );
      case 'success':
        return (
          <div className="text-center">
            <Icon name="CheckCircle" className="mx-auto h-12 w-12 text-green-500" />
            <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">Upload Successful!</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{file?.name}</p>
            <button onClick={handleReset} className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-all">
              Upload Another
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-md dark:shadow-2xl dark:shadow-black/20">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <Icon name={icon} className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{fileType} Upload</h2>
      </div>
      <div className="flex items-center justify-center w-full min-h-[12rem] bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-lg p-6 transition-all">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={status === 'uploading'}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default FileUpload;
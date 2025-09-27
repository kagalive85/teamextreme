import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

// ============================================================================
// TYPES (from types.ts)
// ============================================================================

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

type UploadStatus = 'idle' | 'selected' | 'uploading' | 'success';

type IconName = 'Music' | 'Film' | 'Sun' | 'Moon' | 'UploadCloud' | 'CheckCircle' | 'XCircle' | 'File' | 'Image';

// ============================================================================
// ICON COMPONENT (from components/Icon.tsx)
// ============================================================================

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Music':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case 'Film':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                <line x1="7" y1="2" x2="7" y2="22"></line>
                <line x1="17" y1="2" x2="17" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="2" y1="7" x2="7" y2="7"></line>
                <line x1="2" y1="17" x2="7" y2="17"></line>
                <line x1="17" y1="17" x2="22" y2="17"></line>
                <line x1="17" y1="7" x2="22" y2="7"></line>
            </svg>
        );
    case 'Image':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
        );
    case 'Sun':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        );
    case 'Moon':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        );
    case 'UploadCloud':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                <polyline points="16 16 12 12 8 16"></polyline>
                <line x1="12" y1="12" x2="12" y2="21"></line>
            </svg>
        );
    case 'CheckCircle':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        );
    case 'File':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
        );
    default:
        return null;
  }
};

// ============================================================================
// THEME TOGGLE COMPONENT (from components/ThemeToggle.tsx)
// ============================================================================

interface ThemeToggleProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const isDark = theme === Theme.Dark;

  const toggleTheme = () => {
    setTheme(isDark ? Theme.Light : Theme.Dark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-8 w-14 p-1 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <div className="flex justify-between w-full text-slate-400">
        <Icon name="Sun" className="w-5 h-5" />
        <Icon name="Moon" className="w-5 h-5" />
      </div>
      <span
        className={`${
          isDark ? 'translate-x-6' : 'translate-x-0'
        } absolute top-1 left-1 inline-block w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out`}
      />
    </button>
  );
};

// ============================================================================
// FILE UPLOAD COMPONENT (from components/FileUpload.tsx)
// ============================================================================

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

// ============================================================================
// UPLOADER COMPONENT (from components/Uploader.tsx)
// ============================================================================

const Uploader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <FileUpload
        fileType="Audio"
        accept="audio/*"
        icon="Music"
      />
      <FileUpload
        fileType="Video"
        accept="video/*"
        icon="Film"
      />
      <FileUpload
        fileType="Image"
        accept="image/*"
        icon="Image"
      />
    </div>
  );
};

// ============================================================================
// APP COMPONENT (from App.tsx)
// ============================================================================

const App: React.FC = () => {
  // Default to user's system preference, fallback to dark
  const [theme, setTheme] = useState<Theme>(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return Theme.Light;
    }
    return Theme.Dark;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.Dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="flex justify-between items-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Aura Media Uploader
          </h1>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </header>
        <Uploader />
        <footer className="text-center mt-12 text-sm text-slate-400 dark:text-slate-600">
          <p>Designed for a seamless media upload experience.</p>
        </footer>
      </main>
    </div>
  );
};

// ============================================================================
// RENDER APP (from original index.tsx)
// ============================================================================

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

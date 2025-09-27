
import React from 'react';
import FileUpload from './FileUpload.tsx';

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

export default Uploader;
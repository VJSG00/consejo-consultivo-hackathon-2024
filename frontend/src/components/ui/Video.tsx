import React from 'react';

interface VideoPlayerProps {
  src: string;
  height?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, height = 'h-64 lg:h-80' }) => (
  <div className={`w-full sm:w-auto lg:w-[60.8125rem] xl:ml-16 ${height}`}>
    <iframe
      width="100%"
      height="100%"
      src={src}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="rounded-2xl"
    ></iframe>
  </div>
);

export default VideoPlayer;

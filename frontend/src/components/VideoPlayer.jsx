import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { X, Play, Pause, Volume2, VolumeX, RotateCcw, RotateCw, Maximize2 } from 'lucide-react';

const VideoPlayer = ({ content, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);

  if (!isOpen || !content) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const skipTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  // Extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Close Button */}
      <Button
        onClick={onClose}
        variant="ghost"
        className="absolute top-4 right-4 z-60 text-white hover:bg-white/20 w-12 h-12 rounded-full"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Video Container */}
      <div className="relative w-full h-full max-w-6xl mx-auto">
        {/* YouTube Embed */}
        <div className="relative w-full h-full">
          <iframe
            src={getYouTubeEmbedUrl(content.video_url)}
            title={content.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Content Info Overlay */}
        <div className="absolute bottom-20 left-8 right-8 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-green-500 font-semibold">98% Match</span>
            <span className="px-2 py-1 border border-gray-400 text-sm">
              {content.rating}
            </span>
            <span>{content.year}</span>
            <span>{content.duration}</span>
            <span className="px-2 py-1 bg-gray-700 text-sm rounded">HD</span>
          </div>
          <p className="text-lg mb-4 max-w-2xl">{content.description}</p>
          <div className="text-sm text-gray-300">
            <span className="font-medium">Genre: </span>
            <span>{content.genre}</span>
          </div>
        </div>

        {/* Custom Controls - Hidden when using YouTube embed */}
        {showControls && false && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <div className="flex items-center gap-4">
              <Button
                onClick={togglePlay}
                variant="ghost"
                className="text-white hover:bg-white/20 w-12 h-12 rounded-full"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>

              <Button
                onClick={() => skipTime(-10)}
                variant="ghost"
                className="text-white hover:bg-white/20 w-10 h-10 rounded-full"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>

              <Button
                onClick={() => skipTime(10)}
                variant="ghost"
                className="text-white hover:bg-white/20 w-10 h-10 rounded-full"
              >
                <RotateCw className="w-5 h-5" />
              </Button>

              <div className="flex-1 mx-4">
                {/* Progress Bar Placeholder */}
                <div className="h-1 bg-gray-600 rounded-full">
                  <div className="h-1 bg-red-600 rounded-full w-1/3"></div>
                </div>
              </div>

              <Button
                onClick={toggleMute}
                variant="ghost"
                className="text-white hover:bg-white/20 w-10 h-10 rounded-full"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 w-10 h-10 rounded-full"
              >
                <Maximize2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
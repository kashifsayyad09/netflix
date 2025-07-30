import React, { useState } from 'react';
import { Button } from './ui/button';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { featuredContent } from '../data/mockData';

const HeroBanner = ({ onPlayClick, onInfoClick }) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${featuredContent.backdrop_path})`,
        }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-16 lg:px-20">
        <div className="max-w-2xl">
          {/* Logo/Title */}
          <div className="mb-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {featuredContent.title}
            </h1>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 mb-4 text-white">
            <span className="text-green-500 font-semibold text-lg">98% Match</span>
            <span className="px-2 py-1 border border-gray-400 text-sm font-medium">
              {featuredContent.rating}
            </span>
            <span className="text-lg">{featuredContent.year}</span>
            <span className="text-lg">{featuredContent.duration}</span>
          </div>

          {/* Description */}
          <p className="text-white text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
            {featuredContent.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              onClick={() => onPlayClick(featuredContent)}
              className="bg-white text-black hover:bg-gray-200 font-semibold text-lg px-8 py-3 rounded-md flex items-center gap-3 transition-colors"
            >
              <Play className="w-6 h-6 fill-current" />
              Play
            </Button>
            <Button 
              onClick={() => onInfoClick(featuredContent)}
              variant="secondary"
              className="bg-gray-600/70 text-white hover:bg-gray-500/70 font-semibold text-lg px-8 py-3 rounded-md flex items-center gap-3 transition-colors backdrop-blur-sm"
            >
              <Info className="w-6 h-6" />
              More Info
            </Button>
          </div>

          {/* Genres */}
          <div className="text-white text-lg">
            <span className="text-gray-300">Genre: </span>
            <span>{featuredContent.genre}</span>
          </div>
        </div>
      </div>

      {/* Audio Control */}
      <div className="absolute bottom-20 right-4 md:right-16 z-20">
        <Button
          onClick={() => setIsMuted(!isMuted)}
          variant="ghost"
          className="w-12 h-12 rounded-full border-2 border-white/50 bg-black/20 backdrop-blur-sm hover:bg-white/20 text-white"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </Button>
      </div>

      {/* Age Rating Badge */}
      <div className="absolute bottom-20 left-4 md:left-16 z-20">
        <div className="px-2 py-1 bg-gray-800/80 backdrop-blur-sm text-white text-sm font-medium rounded">
          {featuredContent.rating}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
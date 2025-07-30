import React, { useState } from 'react';
import { Button } from './ui/button';
import { X, Play, Plus, ThumbsUp, ThumbsDown, Share, Download } from 'lucide-react';

const ContentModal = ({ content, isOpen, onClose, onPlayClick }) => {
  const [isInMyList, setIsInMyList] = useState(false);
  const [userRating, setUserRating] = useState(null);

  if (!isOpen || !content) return null;

  const handleMyListToggle = () => {
    setIsInMyList(!isInMyList);
  };

  const handleRating = (rating) => {
    setUserRating(userRating === rating ? null : rating);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header Image */}
        <div className="relative h-64 md:h-96">
          <img
            src={content.backdrop_path}
            alt={content.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-t-lg" />
          
          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            className="absolute top-4 right-4 text-white hover:bg-black/50 w-10 h-10 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Play Button */}
          <div className="absolute bottom-8 left-8">
            <Button
              onClick={() => onPlayClick(content)}
              className="bg-white text-black hover:bg-gray-200 font-semibold text-lg px-8 py-3 rounded-md flex items-center gap-3"
            >
              <Play className="w-6 h-6 fill-current" />
              Play
            </Button>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="flex-1">
              <h1 className="text-white text-3xl font-bold mb-4">{content.title}</h1>
              
              {/* Metadata */}
              <div className="flex items-center gap-4 mb-6 text-white">
                <span className="text-green-500 font-semibold text-lg">98% Match</span>
                <span className="px-2 py-1 border border-gray-400 text-sm">
                  {content.rating}
                </span>
                <span>{content.year}</span>
                <span>{content.duration}</span>
                <span className="px-2 py-1 bg-gray-700 text-sm rounded">HD</span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {content.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mb-8">
                <Button
                  onClick={handleMyListToggle}
                  variant="ghost"
                  className={`
                    w-12 h-12 rounded-full border-2 transition-colors
                    ${isInMyList 
                      ? 'border-white bg-white text-black' 
                      : 'border-gray-400 text-white hover:border-white'
                    }
                  `}
                >
                  <Plus className="w-6 h-6" />
                </Button>

                <Button
                  onClick={() => handleRating('up')}
                  variant="ghost"
                  className={`
                    w-12 h-12 rounded-full border-2 transition-colors
                    ${userRating === 'up'
                      ? 'border-white bg-white text-black'
                      : 'border-gray-400 text-white hover:border-white'
                    }
                  `}
                >
                  <ThumbsUp className="w-6 h-6" />
                </Button>

                <Button
                  onClick={() => handleRating('down')}
                  variant="ghost"
                  className={`
                    w-12 h-12 rounded-full border-2 transition-colors
                    ${userRating === 'down'
                      ? 'border-white bg-white text-black'
                      : 'border-gray-400 text-white hover:border-white'
                    }
                  `}
                >
                  <ThumbsDown className="w-6 h-6" />
                </Button>

                <Button
                  variant="ghost"
                  className="w-12 h-12 rounded-full border-2 border-gray-400 text-white hover:border-white"
                >
                  <Share className="w-6 h-6" />
                </Button>

                <Button
                  variant="ghost"
                  className="w-12 h-12 rounded-full border-2 border-gray-400 text-white hover:border-white"
                >
                  <Download className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:w-80">
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-sm">Cast: </span>
                  <span className="text-white text-sm">
                    Claire Foy, Matt Smith, Vanessa Kirby, Jeremy Northam
                  </span>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Genres: </span>
                  <span className="text-white text-sm">{content.genre}, Historical Drama, Biography</span>
                </div>

                <div>
                  <span className="text-gray-400 text-sm">This {content.type} is: </span>
                  <span className="text-white text-sm">
                    Intimate, Emotional, Character-driven
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 text-sm">Maturity Rating: </span>
                  <span className="text-white text-sm">
                    {content.rating} for mature themes and brief strong language
                  </span>
                </div>
              </div>

              {/* Episodes Section (for series) */}
              {content.type === 'series' && (
                <div className="mt-8">
                  <h3 className="text-white text-xl font-semibold mb-4">Episodes</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((episode) => (
                      <div key={episode} className="flex gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                        <div className="text-white font-semibold text-lg min-w-[2rem]">
                          {episode}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">
                            Episode {episode}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            A glimpse into the episode description for episode {episode}.
                          </p>
                        </div>
                        <div className="text-gray-400 text-sm">
                          58m
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';

const ContentRow = ({ title, items, onItemClick, onPlayClick }) => {
  const scrollRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    // Update scroll button states
    setTimeout(() => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }, 300);
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  return (
    <div className="relative group px-4 md:px-16 lg:px-20 mb-12">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <Button
            onClick={() => scroll('left')}
            variant="ghost"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-32 bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-md border-none"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <Button
            onClick={() => scroll('right')}
            variant="ghost"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-32 bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-md border-none"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        )}

        {/* Content Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="relative flex-shrink-0 group/item"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div 
                className={`
                  relative cursor-pointer transition-all duration-300 ease-in-out
                  ${hoveredItem === item.id 
                    ? 'transform scale-125 z-30' 
                    : 'transform scale-100 z-10'
                  }
                `}
                style={{
                  width: hoveredItem === item.id ? '280px' : '200px',
                  height: hoveredItem === item.id ? '157px' : '112px',
                }}
              >
                {/* Poster Image */}
                <img
                  src={item.poster_path}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                  onClick={() => onItemClick(item)}
                />

                {/* Hover Overlay */}
                {hoveredItem === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-md">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mb-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlayClick(item);
                          }}
                          className="w-8 h-8 rounded-full bg-white text-black hover:bg-gray-200 p-0 flex items-center justify-center"
                        >
                          <Play className="w-4 h-4 fill-current" />
                        </Button>
                        <Button
                          onClick={(e) => e.stopPropagation()}
                          variant="ghost"
                          className="w-8 h-8 rounded-full border-2 border-gray-400 text-white hover:border-white p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={(e) => e.stopPropagation()}
                          variant="ghost"
                          className="w-8 h-8 rounded-full border-2 border-gray-400 text-white hover:border-white p-0"
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onItemClick(item);
                          }}
                          variant="ghost"
                          className="w-8 h-8 rounded-full border-2 border-gray-400 text-white hover:border-white p-0 ml-auto"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Content Info */}
                      <div className="text-xs text-white">
                        <p className="font-semibold truncate mb-1">{item.title}</p>
                        <div className="flex items-center gap-2 text-gray-300">
                          <span className="text-green-500">98% Match</span>
                          <span className="border border-gray-400 px-1 py-0.5 text-xs">
                            {item.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-gray-300">
                          <span>{item.year}</span>
                          <span>•</span>
                          <span>{item.duration}</span>
                        </div>
                        <p className="text-xs text-gray-300 mt-1">{item.genre}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
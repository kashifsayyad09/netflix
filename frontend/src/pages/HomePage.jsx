import React, { useState } from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import ContentRow from '../components/ContentRow';
import ContentModal from '../components/ContentModal';
import VideoPlayer from '../components/VideoPlayer';
import { 
  mockMovies, 
  trendingNow, 
  popularMovies, 
  actionMovies, 
  profiles 
} from '../data/mockData';

const HomePage = () => {
  const [currentProfile, setCurrentProfile] = useState(profiles[0]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [playingContent, setPlayingContent] = useState(null);

  const handleProfileClick = (profile) => {
    setCurrentProfile(profile);
    console.log('Switched to profile:', profile.name);
  };

  const handleContentClick = (content) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const handlePlayClick = (content) => {
    setPlayingContent(content);
    setIsPlayerOpen(true);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setPlayingContent(null);
  };

  const handleSearchClick = () => {
    console.log('Search clicked');
  };

  return (
    <div className="min-h-screen bg-black">
      <Header 
        currentProfile={currentProfile}
        onProfileClick={handleProfileClick}
        onSearchClick={handleSearchClick}
      />

      <main>
        {/* Hero Banner */}
        <HeroBanner 
          onPlayClick={handlePlayClick}
          onInfoClick={handleContentClick}
        />

        {/* Content Rows */}
        <div className="relative -mt-32 z-20">
          <ContentRow
            title="Trending Now"
            items={trendingNow}
            onItemClick={handleContentClick}
            onPlayClick={handlePlayClick}
          />

          <ContentRow
            title="Popular on Netflix"
            items={mockMovies}
            onItemClick={handleContentClick}
            onPlayClick={handlePlayClick}
          />

          <ContentRow
            title="Action Movies" 
            items={actionMovies}
            onItemClick={handleContentClick}
            onPlayClick={handlePlayClick}
          />

          <ContentRow
            title="Watch It Again"
            items={popularMovies}
            onItemClick={handleContentClick}
            onPlayClick={handlePlayClick}
          />

          <ContentRow
            title="New Releases"
            items={[...trendingNow, ...mockMovies].slice(0, 6)}
            onItemClick={handleContentClick}
            onPlayClick={handlePlayClick}
          />
        </div>

        {/* Footer */}
        <footer className="mt-20 px-4 md:px-16 lg:px-20 pb-10">
          <div className="text-gray-400 text-sm space-y-4">
            <div className="flex flex-wrap gap-8">
              <div className="space-y-2">
                <a href="#" className="block hover:text-white transition-colors">Audio Description</a>
                <a href="#" className="block hover:text-white transition-colors">Help Centre</a>
                <a href="#" className="block hover:text-white transition-colors">Gift Cards</a>
                <a href="#" className="block hover:text-white transition-colors">Media Centre</a>
              </div>
              <div className="space-y-2">
                <a href="#" className="block hover:text-white transition-colors">Investor Relations</a>
                <a href="#" className="block hover:text-white transition-colors">Jobs</a>
                <a href="#" className="block hover:text-white transition-colors">Terms of Use</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy</a>
              </div>
              <div className="space-y-2">
                <a href="#" className="block hover:text-white transition-colors">Legal Notices</a>
                <a href="#" className="block hover:text-white transition-colors">Cookie Preferences</a>
                <a href="#" className="block hover:text-white transition-colors">Corporate Information</a>
                <a href="#" className="block hover:text-white transition-colors">Contact Us</a>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-800">
              <p>&copy; 2025 Netflix Clone. Built with React and FastAPI.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Modals */}
      <ContentModal
        content={selectedContent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPlayClick={handlePlayClick}
      />

      <VideoPlayer
        content={playingContent}
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
      />
    </div>
  );
};

export default HomePage;
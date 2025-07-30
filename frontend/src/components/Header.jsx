import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Search, Bell, ChevronDown, Gift } from 'lucide-react';
import { profiles } from '../data/mockData';

const Header = ({ onProfileClick, onSearchClick, currentProfile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', active: true },
    { name: 'TV Shows' },
    { name: 'Movies' },
    { name: 'New & Popular' },
    { name: 'My List' },
    { name: 'Browse by Languages' },
  ];

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-black/95 backdrop-blur-sm' 
          : 'bg-gradient-to-b from-black/60 to-transparent'
        }
      `}
    >
      <div className="flex items-center justify-between px-4 md:px-16 lg:px-20 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Netflix Logo */}
          <div className="text-red-600 text-2xl md:text-3xl font-bold cursor-pointer">
            NETFLIX
          </div>

          {/* Navigation Menu - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                className={`
                  text-sm font-medium transition-colors hover:text-gray-300
                  ${item.active ? 'text-white' : 'text-gray-400'}
                `}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button - Visible on mobile/tablet */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 px-4 py-2 flex items-center gap-2"
            >
              <span className="text-sm">Browse</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            {showSearchBar ? (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  className="bg-black/80 border border-gray-600 text-white placeholder-gray-400 px-4 py-2 w-64 text-sm focus:outline-none focus:border-white transition-colors"
                  autoFocus
                  onBlur={() => setShowSearchBar(false)}
                />
                <Search className="w-6 h-6 text-white ml-2 cursor-pointer" />
              </div>
            ) : (
              <Button
                onClick={() => {
                  setShowSearchBar(true);
                  onSearchClick && onSearchClick();
                }}
                variant="ghost"
                className="text-white hover:bg-white/10 p-2"
              >
                <Search className="w-6 h-6" />
              </Button>
            )}
          </div>

          {/* Kids */}
          <button className="hidden md:block text-white text-sm font-medium hover:text-gray-300 transition-colors">
            Kids
          </button>

          {/* Gift */}
          <Button variant="ghost" className="text-white hover:bg-white/10 p-2">
            <Gift className="w-6 h-6" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" className="text-white hover:bg-white/10 p-2">
            <Bell className="w-6 h-6" />
          </Button>

          {/* Profile Menu */}
          <div className="relative">
            <Button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              variant="ghost"
              className="text-white hover:bg-white/10 p-1 flex items-center gap-2"
            >
              <img
                src={currentProfile?.avatar || profiles[0].avatar}
                alt="Profile"
                className="w-8 h-8 rounded"
              />
              <ChevronDown className="w-4 h-4" />
            </Button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-sm border border-gray-700 rounded-md py-2 min-w-[200px]">
                {profiles.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => {
                      onProfileClick(profile);
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-white hover:bg-white/10 transition-colors text-left"
                  >
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-6 h-6 rounded"
                    />
                    <span className="text-sm">{profile.name}</span>
                  </button>
                ))}
                <hr className="border-gray-700 my-2" />
                <button className="w-full px-4 py-2 text-white hover:bg-white/10 transition-colors text-left text-sm">
                  Manage Profiles
                </button>
                <button className="w-full px-4 py-2 text-white hover:bg-white/10 transition-colors text-left text-sm">
                  Account
                </button>
                <button className="w-full px-4 py-2 text-white hover:bg-white/10 transition-colors text-left text-sm">
                  Help Centre
                </button>
                <button className="w-full px-4 py-2 text-white hover:bg-white/10 transition-colors text-left text-sm">
                  Sign out of Netflix
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
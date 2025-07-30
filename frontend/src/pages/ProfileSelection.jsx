import React from 'react';
import { Button } from '../components/ui/button';
import { Edit } from 'lucide-react';
import { profiles } from '../data/mockData';

const ProfileSelection = ({ onProfileSelect }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-4xl md:text-6xl font-light mb-12">
          Who's watching?
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          {profiles.map((profile) => (
            <div key={profile.id} className="group cursor-pointer">
              <div 
                className="relative mb-4 transition-transform group-hover:scale-110"
                onClick={() => onProfileSelect(profile)}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-lg"
                />
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-white rounded-lg transition-colors" />
                
                {/* Edit Icon on Hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Edit className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <p className="text-white text-lg md:text-xl font-light group-hover:font-normal transition-all">
                {profile.name}
              </p>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="border-gray-400 text-gray-400 hover:border-white hover:text-white bg-transparent px-8 py-3 text-lg font-light"
        >
          Manage Profiles
        </Button>
      </div>
    </div>
  );
};

export default ProfileSelection;
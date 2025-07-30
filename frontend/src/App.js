import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfileSelection from "./pages/ProfileSelection";
import { profiles } from "./data/mockData";

function App() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileSelection, setShowProfileSelection] = useState(true);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setShowProfileSelection(false);
  };

  const handleBackToProfiles = () => {
    setShowProfileSelection(true);
    setSelectedProfile(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              showProfileSelection ? (
                <ProfileSelection onProfileSelect={handleProfileSelect} />
              ) : (
                <HomePage 
                  currentProfile={selectedProfile} 
                  onBackToProfiles={handleBackToProfiles}
                />
              )
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
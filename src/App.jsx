
import { useState } from "react";
import { ProfileSeries } from "./components/profileSeries";
import { ConnectPage } from "./components/connectPage";
import data from "./api/friends.json";

export const App = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleConnect = (profile) => {
    setSelectedProfile(profile);
  };

  const handleBack = () => {
    setSelectedProfile(null);
  };

  const handleWelcomeClose = () => {
    setShowWelcome(false);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (passwordInput === "himu@2007") {
      setIsUnlocked(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  };

  if (!isUnlocked) {
    return (
      <div className="app-view">
        <div className="password-overlay" role="dialog" aria-modal="true">
          <div className="password-card">
            <div className="password-hero">🔒</div>
            <h2>Enter password to continue</h2>
            <p>Please enter the password to unlock the page.</p>
            <form onSubmit={handlePasswordSubmit} className="password-form">
              <input
                type="password"
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                className="password-input"
                placeholder="Enter secure password"
                aria-label="Password"
              />
              <button type="submit" className="password-submit">
                Unlock
              </button>
            </form>
            <p className="password-help">Secure access is required to view the friend profiles.</p>
            {passwordError ? <p className="password-error">{passwordError}</p> : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={selectedProfile ? "app-view connect-view" : "app-view cards-view"}>
      {selectedProfile ? (
        <ConnectPage profile={selectedProfile} onBack={handleBack} />
      ) : (
        <section className="cards-shell">
          {showWelcome && (
            <div className="welcome-overlay" role="dialog" aria-modal="true" aria-live="polite">
              <div className="welcome-card">
                <button type="button" className="welcome-close" onClick={handleWelcomeClose}>
                  ×
                </button>
                <p className="welcome-eyebrow">Welcome</p>
                <h2>Welcome to my page</h2>
                <p>Made by Himanshu Singh Chauhan</p>
                <button type="button" className="welcome-primary" onClick={handleWelcomeClose}>
                  Continue
                </button>
              </div>
            </div>
          )}
          <header className="cards-header">
            <h1>Connect With Friends</h1>
            <p>Pick a profile to chat, follow, and stay connected on social platforms.</p>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="🔍 Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search profiles by name"
              />
            </div>
          </header>
          <ProfileSeries 
            onConnect={handleConnect} 
            filteredProfiles={data.filter((profile) =>
              profile.name.toLowerCase().includes(searchQuery.toLowerCase())
            )}
          />
          <footer className="cards-footer">
            <p className="notice-text">More friends are being added soon — check back later!</p>
          </footer>
        </section>
      )}
    </div>
  );
};
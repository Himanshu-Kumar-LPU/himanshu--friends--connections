import { useState } from "react";

export const ConnectPage = ({ profile, onBack }) => {
  const [statusMessage, setStatusMessage] = useState("");
  const social = profile.socialLinks || {};

  const links = [
    { key: "whatsapp", label: "WhatsApp", url: social.whatsapp, className: "social-whatsapp" },
    { key: "linkedin", label: "LinkedIn", url: social.linkedin, className: "social-linkedin" },
    { key: "instagram", label: "Instagram", url: social.instagram, className: "social-instagram" },
    { key: "facebook", label: "Facebook", url: social.facebook, className: "social-facebook" },
  ];

  const handleClick = (item) => {
    if (!item.url) {
      setStatusMessage(`${profile.name} is not on ${item.label} yet.`);
      return;
    }

    const href = /^https?:\/\//i.test(item.url) ? item.url : `https://${item.url}`;
    window.open(href, "_blank", "noopener,noreferrer");
    setStatusMessage("");
  };

  const closeStatus = () => setStatusMessage("");

  return (
    <section className="connect-page">
      <div className="connect-header">
        <img className="connect-avatar" src={profile.profileImage} alt={profile.name} />
        <div>
          <h2>Connect with {profile.name}</h2>
          <p>Tap any platform tile to open the profile. Unavailable networks will show a quick note.</p>
        </div>
      </div>

      <div className="social-grid">
        {links.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`social-card ${item.className} ${!item.url ? "social-card--disabled" : ""}`}
            onClick={() => handleClick(item)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {statusMessage ? (
        <div className="status-popup-overlay" onClick={closeStatus}>
          <div className="status-popup" role="alertdialog" aria-live="assertive" onClick={(event) => event.stopPropagation()}>
            <div className="status-popup-icon">!</div>
            <p>{statusMessage}</p>
            <button type="button" className="status-close" onClick={closeStatus}>
              Got it
            </button>
          </div>
        </div>
      ) : null}

      <button type="button" className="back-btn" onClick={onBack}>
        Back To Cards
      </button>
    </section>
  );
};

export const ProfileCard = (props) => {
  const bannerStyle = props.curelm.bannerImage
    ? { "--banner-image": `url(${props.curelm.bannerImage})` }
    : {};

  return (
    <article className="card-container">
      {props.curelm.bannerImage ? (
        <a
          className="card-banner banner-clickable"
          style={bannerStyle}
          href={props.curelm.bannerImage}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${props.curelm.name} banner image`}
        />
      ) : (
        <div className="card-banner" style={bannerStyle} />
      )}
      <div className="profile-image-wrap">
        <img className="profile-image" src={props.curelm.profileImage} alt={props.curelm.name} />
      </div>
      <h2>{props.curelm.name}</h2>
      <div className="contact-info">
        <p className="contact-row">
          <span className="icon-wrap">
            <img src="/images/logo-images/email.jpg" alt="email icon" />
          </span>
          <span className="contact-text email-text">{props.curelm.email}</span>
        </p>
        <p className="contact-row">
          <span className="icon-wrap">
            <img src="/images/logo-images/mobile.jpg" alt="phone icon" />
          </span>
          <span className="contact-text">{props.curelm.phone}</span>
        </p>
      </div>
      <div className="location-info">
        <p>
          <strong>State:</strong> {props.curelm.state}
        </p>
        <p>
          <strong>City:</strong> {props.curelm.city}
        </p>
      </div>
      <div className="connect-link">
        <button type="button" onClick={() => props.onConnect(props.curelm)}>
          Connect
        </button>
      </div>
    </article>
  );
};
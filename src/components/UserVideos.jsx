import React from 'react';

const userVideos = [
  {
    id: 1,
    title: 'My First Stream',
    duration: '45:23',
    views: '1.2K',
    date: '2 days ago',
  },
  {
    id: 2,
    title: 'Gaming Session',
    duration: '1:23:15',
    views: '3.5K',
    date: '1 week ago',
  },
  {
    id: 3,
    title: 'Tutorial Stream',
    duration: '32:10',
    views: '856',
    date: '2 weeks ago',
  },
];

function UserVideos() {
  const handleNewStream = () => {
    // Placeholder for future implementation
    console.log('New stream button clicked');
  };

  return (
    <section className="dashboard-section user-video-section">
      <div className="section-header">
        <h2>Your Videos</h2>
        <button className="btn-primary" onClick={handleNewStream}>
          + New Stream
        </button>
      </div>
      <div className="section-content">
        <div className="video-grid">
          {userVideos.map((video) => (
            <div key={video.id} className="video-card">
              <div className="video-thumbnail">
                <div className="thumbnail-placeholder">
                  <span className="play-icon">▶</span>
                </div>
                <div className="video-overlay">
                  <span className="video-duration">{video.duration}</span>
                </div>
              </div>
              <div className="video-card-info">
                <h3 className="video-card-title">{video.title}</h3>
                <p className="video-card-meta">
                  {video.date} • {video.views} views
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UserVideos;


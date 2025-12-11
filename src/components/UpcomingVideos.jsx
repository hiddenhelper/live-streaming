import React from 'react';

const upcomingVideos = [
  {
    id: 1,
    title: 'Scheduled Stream #1',
    time: 'Starts in 2 hours',
  },
  {
    id: 2,
    title: 'Scheduled Stream #2',
    time: 'Starts tomorrow at 3:00 PM',
  },
];

function UpcomingVideos() {
  return (
    <section className="dashboard-section upcoming-section">
      <div className="section-header">
        <h2>Upcoming Videos</h2>
        <span className="section-badge">Coming Soon</span>
      </div>
      <div className="section-content">
        <div className="upcoming-video-list">
          {upcomingVideos.map((video) => (
            <div key={video.id} className="upcoming-video-item">
              <div className="video-thumbnail">
                <div className="thumbnail-placeholder">
                  <span className="play-icon">▶</span>
                </div>
              </div>
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-time">{video.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UpcomingVideos;


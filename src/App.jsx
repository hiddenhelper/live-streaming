import React from 'react';
import Header from './components/Header';
import UpcomingVideos from './components/UpcomingVideos';
import UserVideos from './components/UserVideos';
import ChatSection from './components/ChatSection';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="dashboard">
        <UpcomingVideos />
        <UserVideos />
        <ChatSection />
      </main>
    </div>
  );
}

export default App;


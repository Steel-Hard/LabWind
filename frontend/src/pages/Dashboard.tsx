import React from 'react';
import '../styles.css'

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Agrupando para o hover funcionar */}
      <div className="group">
        {/* Sidebar Responsiva */}
        <div className="sidebar">
          <h2 className="sidebar-title">Menu</h2>
          <nav className="sidebar-nav">
            <a href="#" className="sidebar-link">Link 1</a>
            <a href="#" className="sidebar-link">Link 2</a>
            <a href="#" className="sidebar-link">Link 3</a>
            <a href="#" className="sidebar-link">Link 4</a>
          </nav>
        </div>
      </div>

      {/* MainContent */}
      <div className="main-content">
        <div className="grid-container">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="card">
              <p className="card-text">Card {index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
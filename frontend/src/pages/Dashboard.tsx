import React, {useState} from 'react';
import '../styles.css'

const Dashboard: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState('all');

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
      <div className="station-select">
        <label htmlFor="station">Selecionar Estação:</label>
        <select
          id="station"
          value={selectedStation}
          onChange={(e) => setSelectedStation(e.target.value)}
        >
          <option value="all">Todas as Estações</option>
          <option value="station1">Estação 1</option>
          <option value="station2">Estação 2</option>
          <option value="station3">Estação 3</option>
        </select>
      </div>
        <div className="grid-container">
        <div key={0} className="card">
              <p className="card-text">Vento</p>
            </div>
            <div key={1} className="card">
              <p className="card-text">Temperatura</p>
            </div>
            <div key={2} className="card">
              <p className="card-text">Pressão</p>
            </div>
            <div key={3} className="card">
              <p className="card-text">Umidade</p>
            </div>
            <div key={4} className="card">
              <p className="card-text">Radiação Solar</p>
            </div>
            <div key={5} className="card">
              <p className="card-text">Ondas</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
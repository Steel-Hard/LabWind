import React from 'react';
import '../styles.css'
import { Header,Nav } from '../components';

const Dashboard: React.FC = () => {
  return (

    <>
    
    
    <Header>
      <Nav/>
    </Header>
    
    <div className="dashboard-container">
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
    </>
  );
};

export default Dashboard;
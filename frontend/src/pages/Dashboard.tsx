import React from 'react';
import '../styles.css'
import { Header,Nav } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind, 
  faTemperatureHigh, 
  faWater, 
  faSun,
  faGaugeHigh,
  faDroplet
} from '@fortawesome/free-solid-svg-icons';
const Dashboard: React.FC = () => {
  return (

    <>
    
    
      <Header>
        <Nav/>
      </Header>
    

      <div className="main-content">
        <div className="grid-container">
        
            <div  className="card">
              <FontAwesomeIcon size={'5x'} color='black' icon={faWind}/>
            <p className="card-text">Vento </p>
            </div>

            <div  className="card">
              <FontAwesomeIcon size={'5x'} color='black' icon={faTemperatureHigh}/>
            <p className="card-text">Temperatura</p>
            </div>

            <div  className="card">
              <FontAwesomeIcon size={'5x'} color='black' icon={faGaugeHigh}/>
              <div>
                <p className="card-text">Pressão</p>
              </div>
     
            </div>

            <div  className="card">
              <FontAwesomeIcon size={'5x'} color='black' icon={faDroplet}/>
            <p className="card-text">Umidade</p>
            </div>

            <div  className="card">
              <FontAwesomeIcon size={'5x'} color='black' icon={faSun}/>
            <p className="card-text">Radição Solar</p>
            </div>

            <div  className="card">
            <FontAwesomeIcon size={'5x'} color='black' icon={faWater}/>
            <p className="card-text">Ondas</p>
            </div>
        
        </div>
      </div>

    </>
  );
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, AlertTitle, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind,
  faTemperatureHigh,
  faWater,
  faSun,
  faGaugeHigh,
  faDroplet
} from '@fortawesome/free-solid-svg-icons';
import LabwindDataService from '../../services/LabwindDataService';
import { WeatherAlertData } from '../../types';


const getAlertIcon = (message: string) => {
  const msg = message.toLowerCase();
  if (msg.includes('temperatura')) return faTemperatureHigh;
  if (msg.includes('umidade')) return faDroplet;
  if (msg.includes('pressão')) return faGaugeHigh;
  if (msg.includes('radiação') || msg.includes('uv')) return faSun;
  if (msg.includes('vento')) return faWind;
  return faWater;
};

const WeatherAlerts: React.FC = () => {
  const [alertData, setAlertData] = useState<WeatherAlertData | null>(null);
  const [openAlerts, setOpenAlerts] = useState<{ id: number; msg: string }[]>([]);

  useEffect(() => {
    const fetchWeatherAlerts = async () => {
      try {
        
        const data = await LabwindDataService.checkAlerts();
        
        setAlertData(data);

        const alerts = data.alerts.map((msg, index) => ({
          id: index,
          msg,
        }));
        setOpenAlerts(alerts);
      } catch (error) {
        console.error("Error fetching weather alerts:", error);
      }
    };

    fetchWeatherAlerts();
  }, []);

  const handleClose = (id: number) => {
    setOpenAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  if (!alertData || openAlerts.length === 0) return null;

  return (
    <>
      {openAlerts.map(({ id, msg }, index) => (
        <Snackbar
          key={id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={null}
          style={{ marginTop: index * 80 }} 
        >
          <Alert
            severity="warning"
            icon={<FontAwesomeIcon icon={getAlertIcon(msg)} color="#b45309" />} // laranja escuro
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => handleClose(id)}
              >
                x
              </IconButton>
            }
            className="w-96 h-32 max-h-32 overflow-auto"
            sx={{
              backgroundColor: '#FEF3C7', 
              color: '#92400e', 
              border: '2px solid #F59E42', 
              boxShadow: '0 4px 16px 0 rgba(255, 193, 7, 0.2)',
              fontWeight: 'bold',
            }}
          >
            <AlertTitle className="whitespace-nowrap" style={{ color: '#b45309', fontWeight: 'bold' }}>Alerta Meteorológico</AlertTitle>
            <div className="overflow-y-auto h-16">
              {msg}
            </div>
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default WeatherAlerts;

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

interface WeatherAlertData {
  timestamp: string;
  alerts: string[];
}

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
    fetch('/api/check-alerts') 
      .then((res) => res.json())
      .then((data: WeatherAlertData) => {
        setAlertData(data);
        if (data.alerts && data.alerts.length > 0) {
          setOpenAlerts(data.alerts.map((msg, idx) => ({ id: idx, msg })));
        }
      })
      .catch((err) => console.error('Erro ao buscar alertas:', err));
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
            icon={<FontAwesomeIcon icon={getAlertIcon(msg)} />}
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
          >
            <AlertTitle className="whitespace-nowrap">Alerta Meteorológico</AlertTitle>
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

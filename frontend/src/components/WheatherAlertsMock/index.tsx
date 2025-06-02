import React, { useState } from 'react';
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

const mockAlertData = {
  timestamp: '2025-05-30T14:12:00Z',
  alerts: [
    'Calor extremo: temperatura acima de 37°C',
    'Umidade crítica: abaixo de 20%',
    'Vendaval perigoso: vento acima de 90 km/h',
    'Direção do vento: Sudoeste',
    'Esse é um alerta muito longo para testar o scroll dentro do alerta, ele deve ficar contido e com barra de rolagem vertical para que não aumente o tamanho do alerta e polua a tela'
  ],
};

const getAlertIcon = (message: string) => {
  const msg = message.toLowerCase();
  if (msg.includes('temperatura')) return faTemperatureHigh;
  if (msg.includes('umidade')) return faDroplet;
  if (msg.includes('pressão')) return faGaugeHigh;
  if (msg.includes('radiação') || msg.includes('uv')) return faSun;
  if (msg.includes('vento') || msg.includes('vendaval')) return faWind;
  return faWater;
};

const WeatherAlertsPopup: React.FC = () => {
  const [openAlerts, setOpenAlerts] = useState(
    mockAlertData.alerts.map((msg, idx) => ({ id: idx, msg }))
  );

  const handleClose = (id: number) => {
    setOpenAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <>
      {openAlerts.map(({ id, msg }, index) => (
        <Snackbar
          key={id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={null}
          className={`mt-${index * 24}`} 
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

export default WeatherAlertsPopup;

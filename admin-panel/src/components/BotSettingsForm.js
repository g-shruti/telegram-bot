import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BotSettingsForm = () => {
  const [weatherKey, setWeatherKey] = useState('');
  const [updateTime, setUpdateTime] = useState('08:00');

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/settings`);
      setWeatherKey(res.data.weatherApiKey || '');
      setUpdateTime(res.data.updateTime || '08:00');
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const saveSettings = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/settings`, {
        weatherApiKey: weatherKey,
        updateTime,
      });
      alert('Settings updated!');
    } catch (err) {
      alert('Error updating settings.');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Bot Settings</h3>
      <div>
        <label>OpenWeather API Key:</label><br />
        <input
          type="text"
          value={weatherKey}
          onChange={(e) => setWeatherKey(e.target.value)}
          style={{ width: "300px" }}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>Update Time (24h format, e.g. 08:00):</label><br />
        <input
          type="time"
          value={updateTime}
          onChange={(e) => setUpdateTime(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={saveSettings}>Save</button>
      </div>
    </div>
  );
};

export default BotSettingsForm;

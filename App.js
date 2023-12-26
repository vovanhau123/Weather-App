import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const API_KEY = 'ce485d972620f2377ef140bd9af2fccf';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Ho%20Chi%20Minh%20City,vn&appid=${API_KEY}&units=metric`;

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const renderWeatherInfo = () => {
    if (weatherData) {
      const { main, description } = weatherData.weather[0];
      const { temp } = weatherData.main;

      return (
        <>
          <Text style={styles.temperature}>{Math.round(temp)}°C</Text>
          <Text style={styles.weatherDescription}>{description}</Text>
        </>
      );
    }

    return <Text>Loading...</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <View style={styles.weatherInfoContainer}>{renderWeatherInfo()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  weatherInfoContainer: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  weatherDescription: {
    fontSize: 18,
  },
});

export default App;
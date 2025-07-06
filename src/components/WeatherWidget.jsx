import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { fetchWeatherData } from '../services/api';

const { FiCloud, FiSun, FiCloudRain, FiWind, FiDroplet, FiEye, FiRefreshCw, FiThermometer } = FiIcons;

function WeatherWidget({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(city);
      if (data) {
        setWeatherData(data);
        setLastUpdated(new Date());
      } else {
        setError('Weather data unavailable');
      }
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    
    // Auto-refresh every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [city]);

  if (!city) {
    return (
      <motion.div 
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="text-6xl mb-4"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🌤️
        </motion.div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Weather Check</h3>
        <p className="text-gray-600 font-medium">Select a city to view live weather</p>
      </motion.div>
    );
  }

  if (loading && !weatherData) {
    return (
      <motion.div 
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <motion.div 
            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="text-3xl">🌡️</div>
        </div>
        <p className="text-gray-600 font-medium">Getting weather data...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-6xl mb-4">😔</div>
        <h3 className="text-lg font-bold text-red-600 mb-2">Weather Unavailable</h3>
        <p className="text-gray-600 font-medium mb-4">{error}</p>
        <motion.button
          onClick={fetchWeather}
          className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      </motion.div>
    );
  }

  if (!weatherData) return null;

  const getWeatherIcon = (iconName) => {
    const icons = {
      'FiSun': FiSun,
      'FiCloud': FiCloud,
      'FiCloudRain': FiCloudRain,
      'FiCloudDrizzle': FiCloudRain,
      'FiZap': FiCloud,
      'FiCloudSnow': FiCloud
    };
    return icons[iconName] || FiCloud;
  };

  const getWeatherEmoji = (iconName) => {
    const emojis = {
      'FiSun': '☀️',
      'FiCloud': '☁️',
      'FiCloudRain': '🌧️',
      'FiCloudDrizzle': '🌦️',
      'FiZap': '⛈️',
      'FiCloudSnow': '❄️'
    };
    return emojis[iconName] || '🌤️';
  };

  const getWeatherAlert = () => {
    if (weatherData.rainfall > 20) {
      return {
        level: 'danger',
        message: 'Heavy rain detected! Classes might be suspended 🚨',
        emoji: '🌧️',
        color: 'red'
      };
    } else if (weatherData.rainfall > 10) {
      return {
        level: 'warning',
        message: 'Moderate rain. Keep monitoring for updates 🌦️',
        emoji: '⚠️',
        color: 'yellow'
      };
    } else if (weatherData.windSpeed > 40) {
      return {
        level: 'warning',
        message: 'Strong winds detected. Stay safe! 💨',
        emoji: '💨',
        color: 'yellow'
      };
    } else {
      return {
        level: 'normal',
        message: 'Weather looks good! Perfect for classes 🌤️',
        emoji: '✅',
        color: 'green'
      };
    }
  };

  const alert = getWeatherAlert();

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">🌡️</div>
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Weather Check
            </h3>
            <p className="text-gray-600 font-medium">{city}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {lastUpdated && (
            <div className="text-right">
              <div className="text-xs text-gray-500">Updated</div>
              <div className="text-sm font-bold text-green-600">
                {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          )}
          <motion.button
            onClick={fetchWeather}
            disabled={loading}
            className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiRefreshCw} className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>
      </div>

      <div className="text-center mb-8">
        <motion.div 
          className="text-6xl mb-4"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {getWeatherEmoji(weatherData.icon)}
        </motion.div>
        <div className="text-4xl font-bold text-gray-800 mb-2">{weatherData.temperature}°C</div>
        <div className="text-gray-600 capitalize font-medium text-lg">{weatherData.condition}</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="text-2xl mb-2">💨</div>
          <div className="text-sm font-medium text-blue-800 mb-1">Wind Speed</div>
          <div className="text-lg font-bold text-blue-900">{weatherData.windSpeed} km/h</div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="text-2xl mb-2">💧</div>
          <div className="text-sm font-medium text-green-800 mb-1">Humidity</div>
          <div className="text-lg font-bold text-green-900">{weatherData.humidity}%</div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="text-2xl mb-2">🌧️</div>
          <div className="text-sm font-medium text-purple-800 mb-1">Rainfall</div>
          <div className="text-lg font-bold text-purple-900">{weatherData.rainfall} mm</div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-4 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="text-2xl mb-2">👁️</div>
          <div className="text-sm font-medium text-orange-800 mb-1">Visibility</div>
          <div className="text-lg font-bold text-orange-900">{weatherData.visibility} km</div>
        </motion.div>
      </div>

      <motion.div 
        className={`p-4 rounded-2xl ${
          alert.color === 'red' ? 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200' :
          alert.color === 'yellow' ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200' :
          'bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200'
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{alert.emoji}</div>
          <div>
            <div className="font-bold text-gray-800 mb-1">Weather Alert</div>
            <p className={`text-sm font-medium ${
              alert.color === 'red' ? 'text-red-800' :
              alert.color === 'yellow' ? 'text-yellow-800' :
              'text-green-800'
            }`}>
              {alert.message}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default WeatherWidget;
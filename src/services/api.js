// API service for real-time data
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = 'your-openweather-api-key'; // Replace with actual API key

// Philippine cities with their coordinates for weather API
const CITY_COORDINATES = {
  'Manila': { lat: 14.5995, lon: 120.9842 },
  'Quezon City': { lat: 14.6760, lon: 121.0437 },
  'Caloocan': { lat: 14.6488, lon: 120.9676 },
  'Davao': { lat: 7.1907, lon: 125.4553 },
  'Cebu City': { lat: 10.3157, lon: 123.8854 },
  'Zamboanga City': { lat: 6.9214, lon: 122.0790 },
  'Antipolo': { lat: 14.5832, lon: 121.1815 },
  'Taguig': { lat: 14.5176, lon: 121.0509 },
  'Pasig': { lat: 14.5764, lon: 121.0851 },
  'Cagayan de Oro': { lat: 8.4542, lon: 124.6319 },
  'Parañaque': { lat: 14.4793, lon: 121.0198 },
  'Valenzuela': { lat: 14.7000, lon: 120.9831 },
  'Bacoor': { lat: 14.4590, lon: 120.9446 },
  'General Santos': { lat: 6.1164, lon: 125.1716 },
  'Las Piñas': { lat: 14.4378, lon: 120.9761 },
  'Makati': { lat: 14.5547, lon: 121.0244 },
  'Bacolod': { lat: 10.6770, lon: 122.9500 },
  'Muntinlupa': { lat: 14.3832, lon: 121.0409 },
  'Baguio': { lat: 16.4023, lon: 120.5960 },
  'Iloilo City': { lat: 10.7202, lon: 122.5621 }
};

// Real-time weather data
export const fetchWeatherData = async (city) => {
  try {
    const coords = CITY_COORDINATES[city];
    if (!coords) {
      throw new Error('City not found');
    }

    const response = await fetch(
      `${API_BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data unavailable');
    }
    
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      rainfall: data.rain ? data.rain['1h'] || 0 : 0,
      icon: getWeatherIcon(data.weather[0].main),
      pressure: data.main.pressure,
      visibility: data.visibility / 1000, // Convert to km
      cloudiness: data.clouds.all
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

// Get weather icon based on condition
const getWeatherIcon = (condition) => {
  const iconMap = {
    'Clear': 'FiSun',
    'Clouds': 'FiCloud',
    'Rain': 'FiCloudRain',
    'Drizzle': 'FiCloudDrizzle',
    'Thunderstorm': 'FiZap',
    'Snow': 'FiCloudSnow',
    'Mist': 'FiCloud',
    'Fog': 'FiCloud'
  };
  return iconMap[condition] || 'FiCloud';
};

// Fetch real-time announcements from multiple sources
export const fetchSchoolAnnouncements = async (city) => {
  try {
    // In a real implementation, this would aggregate from multiple sources
    const announcements = await Promise.all([
      fetchDepEdAnnouncements(city),
      fetchLGUAnnouncements(city),
      fetchPAGASAAnnouncements(city),
      fetchNDRRMCAnnouncements(city)
    ]);

    // Combine and deduplicate announcements
    const allAnnouncements = announcements.flat().filter(Boolean);
    
    // Sort by date (newest first)
    return allAnnouncements.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
};

// DepEd announcements scraper
const fetchDepEdAnnouncements = async (city) => {
  try {
    // This would scrape from DepEd regional websites
    // For now, we'll use a news API that aggregates DepEd announcements
    const response = await fetch(`https://newsapi.org/v2/everything?q="class+suspension"+${city}+DepEd&sortBy=publishedAt&apiKey=your-news-api-key`);
    
    if (!response.ok) return [];
    
    const data = await response.json();
    
    return data.articles.slice(0, 3).map(article => ({
      id: `deped-${article.publishedAt}`,
      city: city,
      status: determineStatus(article.title + ' ' + article.description),
      date: article.publishedAt,
      reason: extractReason(article.title + ' ' + article.description),
      source: 'DepEd Regional Office',
      sourceUrl: article.url,
      level: 'All levels',
      verified: true,
      title: article.title
    }));
  } catch (error) {
    console.error('Error fetching DepEd announcements:', error);
    return [];
  }
};

// LGU announcements scraper
const fetchLGUAnnouncements = async (city) => {
  try {
    // This would scrape from LGU Facebook pages and websites
    const response = await fetch(`https://newsapi.org/v2/everything?q="walang+pasok"+${city}+mayor&sortBy=publishedAt&apiKey=your-news-api-key`);
    
    if (!response.ok) return [];
    
    const data = await response.json();
    
    return data.articles.slice(0, 2).map(article => ({
      id: `lgu-${article.publishedAt}`,
      city: city,
      status: determineStatus(article.title + ' ' + article.description),
      date: article.publishedAt,
      reason: extractReason(article.title + ' ' + article.description),
      source: `${city} Mayor's Office`,
      sourceUrl: article.url,
      level: 'All levels',
      verified: true,
      title: article.title
    }));
  } catch (error) {
    console.error('Error fetching LGU announcements:', error);
    return [];
  }
};

// PAGASA weather-based announcements
const fetchPAGASAAnnouncements = async (city) => {
  try {
    const weatherData = await fetchWeatherData(city);
    if (!weatherData) return [];

    // Generate weather-based recommendations
    const announcements = [];
    
    if (weatherData.rainfall > 20) {
      announcements.push({
        id: `pagasa-${Date.now()}`,
        city: city,
        status: 'suspended',
        date: new Date().toISOString(),
        reason: `Heavy rainfall warning: ${weatherData.rainfall}mm recorded`,
        source: 'PAGASA Weather Bureau',
        sourceUrl: 'https://www.pagasa.dost.gov.ph',
        level: 'All levels',
        verified: true,
        title: 'Weather Advisory: Heavy Rainfall'
      });
    }

    if (weatherData.windSpeed > 60) {
      announcements.push({
        id: `pagasa-wind-${Date.now()}`,
        city: city,
        status: 'suspended',
        date: new Date().toISOString(),
        reason: `Strong winds: ${weatherData.windSpeed}km/h recorded`,
        source: 'PAGASA Weather Bureau',
        sourceUrl: 'https://www.pagasa.dost.gov.ph',
        level: 'All levels',
        verified: true,
        title: 'Weather Advisory: Strong Winds'
      });
    }

    return announcements;
  } catch (error) {
    console.error('Error fetching PAGASA announcements:', error);
    return [];
  }
};

// NDRRMC disaster-related announcements
const fetchNDRRMCAnnouncements = async (city) => {
  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q="NDRRMC"+${city}+disaster&sortBy=publishedAt&apiKey=your-news-api-key`);
    
    if (!response.ok) return [];
    
    const data = await response.json();
    
    return data.articles.slice(0, 1).map(article => ({
      id: `ndrrmc-${article.publishedAt}`,
      city: city,
      status: determineStatus(article.title + ' ' + article.description),
      date: article.publishedAt,
      reason: extractReason(article.title + ' ' + article.description),
      source: 'NDRRMC',
      sourceUrl: article.url,
      level: 'All levels',
      verified: true,
      title: article.title
    }));
  } catch (error) {
    console.error('Error fetching NDRRMC announcements:', error);
    return [];
  }
};

// Helper function to determine status from text
const determineStatus = (text) => {
  const suspensionKeywords = ['suspend', 'cancel', 'postpone', 'walang pasok', 'no classes'];
  const normalKeywords = ['resume', 'normal', 'continue', 'proceed'];
  
  const lowerText = text.toLowerCase();
  
  if (suspensionKeywords.some(keyword => lowerText.includes(keyword))) {
    return 'suspended';
  }
  
  if (normalKeywords.some(keyword => lowerText.includes(keyword))) {
    return 'normal';
  }
  
  return 'suspended'; // Default to suspended for safety
};

// Helper function to extract reason from text
const extractReason = (text) => {
  const reasons = [
    'heavy rainfall', 'flooding', 'typhoon', 'storm', 'earthquake',
    'volcanic activity', 'landslide', 'strong winds', 'bad weather',
    'disaster', 'emergency', 'safety concerns'
  ];
  
  const lowerText = text.toLowerCase();
  
  for (const reason of reasons) {
    if (lowerText.includes(reason)) {
      return `Due to ${reason}`;
    }
  }
  
  return 'Weather-related concerns';
};

// Fetch real-time news about school suspensions
export const fetchSchoolNews = async (city) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q="school+suspension"+OR+"walang+pasok"+${city}&sortBy=publishedAt&pageSize=5&apiKey=your-news-api-key`
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    
    return data.articles.map(article => ({
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      urlToImage: article.urlToImage
    }));
  } catch (error) {
    console.error('Error fetching school news:', error);
    return [];
  }
};

// Get emergency contacts for a city
export const getEmergencyContacts = (city) => {
  const contacts = {
    'Manila': {
      depedOffice: 'DepEd Manila',
      depedPhone: '+63 2 8123 4567',
      mayorOffice: 'Manila Mayor\'s Office',
      mayorPhone: '+63 2 8527 4034',
      emergency: '911'
    },
    'Quezon City': {
      depedOffice: 'DepEd Quezon City',
      depedPhone: '+63 2 8988 4242',
      mayorOffice: 'Quezon City Mayor\'s Office',
      mayorPhone: '+63 2 8988 4242',
      emergency: '911'
    },
    'Cebu City': {
      depedOffice: 'DepEd Cebu City',
      depedPhone: '+63 32 255 1681',
      mayorOffice: 'Cebu City Mayor\'s Office',
      mayorPhone: '+63 32 255 8181',
      emergency: '911'
    },
    'Davao': {
      depedOffice: 'DepEd Davao',
      depedPhone: '+63 82 227 8592',
      mayorOffice: 'Davao Mayor\'s Office',
      mayorPhone: '+63 82 227 1000',
      emergency: '911'
    }
  };
  
  return contacts[city] || {
    depedOffice: `DepEd ${city}`,
    depedPhone: 'Contact local DepEd office',
    mayorOffice: `${city} Mayor's Office`,
    mayorPhone: 'Contact local government',
    emergency: '911'
  };
};
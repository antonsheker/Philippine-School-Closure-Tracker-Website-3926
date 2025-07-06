import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import CitySearch from './components/CitySearch';
import AnnouncementList from './components/AnnouncementList';
import WeatherWidget from './components/WeatherWidget';
import NewsWidget from './components/NewsWidget';
import EmergencyContacts from './components/EmergencyContacts';
import SourcesSection from './components/SourcesSection';
import Footer from './components/Footer';
import CityDetails from './components/CityDetails';
import './App.css';

function App() {
  const [selectedCity, setSelectedCity] = useState('');

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <Routes>
          <Route path="/" element={
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <CitySearch onCitySelect={handleCitySelect} />
                    <AnnouncementList selectedCity={selectedCity} />
                    {selectedCity && <NewsWidget city={selectedCity} />}
                  </div>
                  <div className="space-y-8">
                    <WeatherWidget city={selectedCity} />
                    {selectedCity && <EmergencyContacts city={selectedCity} />}
                    <SourcesSection />
                  </div>
                </div>
              </div>
            </motion.main>
          } />
          <Route path="/city/:cityName" element={<CityDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
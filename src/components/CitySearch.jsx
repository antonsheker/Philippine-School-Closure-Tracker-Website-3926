import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiMapPin, FiTrendingUp, FiStar } = FiIcons;

const philippineCities = [
  'Manila', 'Quezon City', 'Caloocan', 'Davao', 'Cebu City', 'Zamboanga City',
  'Antipolo', 'Taguig', 'Pasig', 'Cagayan de Oro', 'Parañaque', 'Valenzuela',
  'Bacoor', 'General Santos', 'Las Piñas', 'Makati', 'Bacolod', 'Muntinlupa',
  'San Jose del Monte', 'Iloilo City', 'Marikina', 'Dasmariñas', 'Malolos',
  'Tarlac City', 'Calamba', 'Baguio', 'Legazpi', 'San Fernando', 'Batangas City',
  'Cabanatuan', 'Lipa', 'Olongapo', 'Butuan', 'Angeles', 'Naga', 'Imus',
  'General Trias', 'Bago', 'Tacloban', 'Trece Martires', 'Biñan', 'Lucena',
  'Dumaguete', 'Puerto Princesa', 'Sagay', 'Iligan', 'Kabankalan', 'Koronadal',
  'Tuguegarao', 'Roxas', 'San Carlos', 'Urdaneta', 'Tabuk', 'Bayawan'
];

const popularCities = ['Manila', 'Quezon City', 'Cebu City', 'Davao', 'Makati', 'Baguio'];

function CitySearch({ onCitySelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 0) {
      const filtered = philippineCities.filter(city =>
        city.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleCitySelect = (city) => {
    setSearchTerm(city);
    setShowDropdown(false);
    onCitySelect(city);
  };

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <div className="text-center mb-8">
        <motion.div 
          className="text-4xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔍
        </motion.div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Find Your City
        </h2>
        <p className="text-gray-600 font-medium">
          Get instant updates for your area 📍
        </p>
      </div>

      <div className="relative mb-8">
        <div className="relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
          />
          <motion.input
            type="text"
            placeholder="Type your city name (e.g., Manila, Cebu City, Davao)"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all text-lg font-medium placeholder-gray-400 bg-white/90"
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        </div>

        {showDropdown && filteredCities.length > 0 && (
          <motion.div 
            className="absolute z-20 w-full mt-2 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl max-h-64 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCities.map((city, index) => (
              <motion.button
                key={city}
                onClick={() => handleCitySelect(city)}
                className="w-full px-6 py-4 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              >
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMapPin} className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-800">{city}</span>
                  {popularCities.includes(city) && (
                    <span className="ml-auto text-xs bg-gradient-to-r from-orange-400 to-pink-400 text-white px-2 py-1 rounded-full font-bold">
                      🔥 Popular
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
          <span className="font-semibold">Popular Cities:</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {popularCities.map((city, index) => (
            <motion.button
              key={city}
              onClick={() => handleCitySelect(city)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {city}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div 
        className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-center font-medium text-gray-700">
          <SafeIcon icon={FiStar} className="w-4 h-4 inline mr-2 text-yellow-500" />
          <strong>Pro Tip:</strong> Bookmark this page for instant access to updates! 
          We check official sources every 5 minutes ⏰
        </p>
      </motion.div>
    </motion.div>
  );
}

export default CitySearch;
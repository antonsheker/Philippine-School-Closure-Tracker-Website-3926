import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMapPin, FiUsers, FiPhone, FiGlobe } = FiIcons;

function CityDetails() {
  const { cityName } = useParams();

  // Mock city data - in real app, this would come from an API
  const cityData = {
    name: cityName,
    population: '1,780,148',
    schools: '1,200+',
    depedOffice: 'DepEd Manila',
    contact: '+63 2 8123 4567',
    website: 'https://manila.gov.ph',
    recentAnnouncements: [
      {
        id: 1,
        date: '2024-01-15',
        title: 'Classes suspended due to heavy rainfall',
        source: 'Manila Mayor\'s Office'
      },
      {
        id: 2,
        date: '2024-01-10',
        title: 'Normal classes resume',
        source: 'DepEd Manila'
      }
    ]
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-4 mb-8">
          <SafeIcon icon={FiMapPin} className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{cityData.name}</h1>
            <p className="text-gray-600">School Suspension Information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">City Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiUsers} className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Population</p>
                  <p className="font-semibold">{cityData.population}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMapPin} className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Schools</p>
                  <p className="font-semibold">{cityData.schools}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-semibold">{cityData.contact}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiGlobe} className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Website</p>
                  <a href={cityData.website} className="font-semibold text-blue-600 hover:underline">
                    {cityData.website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Announcements</h2>
            <div className="space-y-3">
              {cityData.recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border border-gray-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-800 mb-1">{announcement.title}</p>
                  <p className="text-sm text-gray-600">{announcement.source}</p>
                  <p className="text-xs text-gray-500 mt-1">{announcement.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CityDetails;
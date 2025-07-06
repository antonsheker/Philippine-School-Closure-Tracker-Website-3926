import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { fetchSchoolAnnouncements } from '../services/api';

const { FiAlertCircle, FiCheckCircle, FiExternalLink, FiClock, FiShield, FiRefreshCw, FiZap } = FiIcons;

function AnnouncementList({ selectedCity }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const fetchAnnouncements = async () => {
    if (!selectedCity) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchSchoolAnnouncements(selectedCity);
      setAnnouncements(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch announcements. Please try again.');
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchAnnouncements, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [selectedCity]);

  if (!selectedCity) {
    return (
      <motion.div 
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 text-center border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="text-8xl mb-6"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎯
        </motion.div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Choose Your City First!
        </h3>
        <p className="text-gray-600 text-lg font-medium leading-relaxed">
          Select your city above to get <span className="text-blue-600 font-bold">real-time updates</span> 
          from official sources 📱
        </p>
      </motion.div>
    );
  }

  if (loading && announcements.length === 0) {
    return (
      <motion.div 
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 text-center border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-4 mb-6">
          <motion.div 
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="text-4xl">🔄</div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Getting Latest Updates for {selectedCity}...
        </h3>
        <p className="text-gray-600 font-medium">
          Checking official sources • This won't take long! ⚡
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <motion.div 
            className="text-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📢
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Live Updates
            </h2>
            <p className="text-gray-600 font-medium">{selectedCity} • Real-time</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <div className="text-right">
              <div className="text-xs text-gray-500 font-medium">Last updated</div>
              <div className="text-sm font-bold text-green-600">
                {format(lastUpdated, 'HH:mm')}
              </div>
            </div>
          )}
          <motion.button
            onClick={fetchAnnouncements}
            disabled={loading}
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg disabled:opacity-50 hover:from-blue-600 hover:to-purple-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiRefreshCw} className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>
      </div>

      {error && (
        <motion.div 
          className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <div className="font-bold text-red-800">Oops! Something went wrong</div>
              <div className="text-red-600 font-medium">{error}</div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-6">
        {announcements.length === 0 && !loading ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">All Clear!</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              No school suspension announcements for <span className="text-blue-600 font-bold">{selectedCity}</span> right now.
              <br />
              Classes are likely proceeding as normal! 📚
            </p>
          </motion.div>
        ) : (
          announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              className={`relative overflow-hidden rounded-2xl p-6 border-2 ${
                announcement.status === 'suspended' 
                  ? 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50' 
                  : 'border-green-300 bg-gradient-to-r from-green-50 to-blue-50'
              } shadow-lg`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Status Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                announcement.status === 'suspended' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-green-500 text-white'
              }`}>
                {announcement.status === 'suspended' ? '🚫 SUSPENDED' : '✅ NORMAL'}
              </div>

              <div className="flex items-start space-x-4">
                <div className={`text-3xl ${
                  announcement.status === 'suspended' ? 'animate-bounce' : ''
                }`}>
                  {announcement.status === 'suspended' ? '⚠️' : '✅'}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <h4 className="font-bold text-lg text-gray-800">
                      {announcement.status === 'suspended' ? 'Classes Suspended' : 'Classes Normal'}
                    </h4>
                    {announcement.verified && (
                      <div className="flex items-center space-x-1 bg-blue-100 px-2 py-1 rounded-full">
                        <SafeIcon icon={FiShield} className="w-3 h-3 text-blue-600" />
                        <span className="text-xs font-bold text-blue-600">VERIFIED</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-800 font-semibold mb-3 text-lg leading-relaxed">
                    {announcement.reason}
                  </p>
                  
                  {announcement.title && (
                    <p className="text-gray-700 mb-3 font-medium">
                      {announcement.title}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiClock} className="w-4 h-4" />
                        <span className="font-medium">
                          {format(new Date(announcement.date), 'MMM dd, yyyy - HH:mm')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">📍 {announcement.source}</span>
                      </div>
                    </div>
                    
                    {announcement.sourceUrl && (
                      <motion.a 
                        href={announcement.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-600 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Source</span>
                        <SafeIcon icon={FiExternalLink} className="w-3 h-3" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <motion.div 
        className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start space-x-4">
          <div className="text-2xl">🛡️</div>
          <div>
            <h4 className="font-bold text-blue-900 mb-2">Why Trust Us?</h4>
            <p className="text-blue-800 font-medium leading-relaxed">
              We automatically check official sources every 5 minutes: DepEd offices, 
              local government units, PAGASA weather bulletins, and verified news sources. 
              <span className="text-blue-600 font-bold"> Always reliable, always updated!</span> ⚡
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AnnouncementList;
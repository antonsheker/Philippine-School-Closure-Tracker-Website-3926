import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { getEmergencyContacts } from '../services/api';

const { FiPhone, FiMapPin, FiAlertTriangle, FiShield } = FiIcons;

function EmergencyContacts({ city }) {
  if (!city) return null;

  const contacts = getEmergencyContacts(city);

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <motion.div 
          className="text-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          📞
        </motion.div>
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Emergency Contacts
          </h3>
          <p className="text-gray-600 font-medium">For {city}</p>
        </div>
      </div>

      <div className="space-y-6">
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-2xl">🏛️</div>
            <h4 className="font-bold text-blue-900 text-lg">DepEd Office</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiMapPin} className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">{contacts.depedOffice}</span>
            </div>
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiPhone} className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-bold text-lg">{contacts.depedPhone}</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-2xl">🏢</div>
            <h4 className="font-bold text-green-900 text-lg">Local Government</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiMapPin} className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">{contacts.mayorOffice}</span>
            </div>
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiPhone} className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-bold text-lg">{contacts.mayorPhone}</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <motion.div 
              className="text-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🚨
            </motion.div>
            <h4 className="font-bold text-red-900 text-lg">Emergency Hotline</h4>
          </div>
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiPhone} className="w-6 h-6 text-red-600" />
            <span className="text-red-800 font-bold text-2xl">{contacts.emergency}</span>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start space-x-4">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="font-bold text-yellow-900 mb-2">Important Reminder</h4>
            <p className="text-yellow-800 font-medium leading-relaxed">
              <strong>Always double-check</strong> class suspension announcements through official channels 
              before making any decisions. When in doubt, contact your school directly! 🏫
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default EmergencyContacts;
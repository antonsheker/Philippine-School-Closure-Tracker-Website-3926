import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMail, FiPhone, FiMapPin, FiGithub, FiTwitter, FiFacebook, FiHeart, FiStar } = FiIcons;

function Footer() {
  return (
    <motion.footer 
      className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-3xl">🎒</div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  Walang Pasok
                </span>
                <div className="text-sm text-gray-300 font-medium">Made with ❤️ in PH</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed font-medium">
              Your most trusted source for real-time school suspension updates. 
              <span className="text-yellow-400 font-bold"> Always reliable, always updated!</span>
            </p>
            <div className="flex items-center space-x-2 mt-4 text-sm">
              <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-300 font-medium">Trusted by 100,000+ families</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-2">
                  <span>🏠</span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#sources" className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-2">
                  <span>📋</span>
                  <span>Official Sources</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-2">
                  <span>🌤️</span>
                  <span>Weather Updates</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-2">
                  <span>🚨</span>
                  <span>Emergency Contacts</span>
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Official Sources</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://www.deped.gov.ph" className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-2">
                  <span>🏛️</span>
                  <span>DepEd Philippines</span>
                </a>
              </li>
              <li>
                <a href="https://www.pagasa.dost.gov.ph" className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-2">
                  <span>🌡️</span>
                  <span>PAGASA</span>
                </a>
              </li>
              <li>
                <a href="https://ndrrmc.gov.ph" className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-2">
                  <span>🚨</span>
                  <span>NDRRMC</span>
                </a>
              </li>
              <li>
                <a href="https://www.officialgazette.gov.ph" className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-2">
                  <span>📰</span>
                  <span>Official Gazette</span>
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Stay Connected</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300 font-medium">info@walangpasok.ph</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="w-5 h-5 text-green-400" />
                <span className="text-gray-300 font-medium">+63 2 8123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMapPin} className="w-5 h-5 text-red-400" />
                <span className="text-gray-300 font-medium">Philippines</span>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <motion.a 
                href="#" 
                className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SafeIcon icon={FiFacebook} className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="p-3 bg-blue-400 rounded-full hover:bg-blue-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SafeIcon icon={FiTwitter} className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SafeIcon icon={FiGithub} className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm font-medium">
              © 2024 Walang Pasok Philippines. Made with <SafeIcon icon={FiHeart} className="w-4 h-4 inline text-red-400" /> for Filipino families.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">Privacy Policy</span>
              <span className="text-gray-400 text-sm">Terms of Service</span>
              <span className="text-gray-400 text-sm">Contact Us</span>
            </div>
          </div>
        </div>

        <motion.div 
          className="mt-8 p-6 bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-2xl border border-yellow-700/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-start space-x-4">
            <div className="text-3xl">⚠️</div>
            <div>
              <h4 className="font-bold text-yellow-100 mb-2 text-lg">Important Disclaimer</h4>
              <p className="text-yellow-200 font-medium leading-relaxed">
                This website aggregates information from official sources for your convenience. 
                <span className="text-yellow-100 font-bold"> Always verify with your local DepEd office, school administration, or local government</span> 
                for the most current and accurate information before making any decisions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiInfo, FiPhone, FiMenu, FiX } = FiIcons;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="text-3xl animate-bounce">🎒</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Walang Pasok
              </h1>
              <p className="text-xs text-gray-600 font-medium">Always Updated • Always Reliable</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.a 
              href="#" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <SafeIcon icon={FiHome} className="w-4 h-4" />
              <span>Home</span>
            </motion.a>
            <motion.a 
              href="#sources" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <SafeIcon icon={FiInfo} className="w-4 h-4" />
              <span>Sources</span>
            </motion.a>
            <motion.a 
              href="#contact" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <SafeIcon icon={FiPhone} className="w-4 h-4" />
              <span>Contact</span>
            </motion.a>
            <motion.div 
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full text-sm font-semibold shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              ✅ Live Updates
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden pb-4 border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pt-4 space-y-3">
              <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                🏠 Home
              </a>
              <a href="#sources" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                📋 Sources
              </a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                📞 Contact
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

export default Header;
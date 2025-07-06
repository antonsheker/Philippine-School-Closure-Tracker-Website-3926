import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiAlertTriangle, FiCheckCircle, FiClock, FiShield, FiZap, FiHeart } = FiIcons;

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-green-300/20 rounded-full animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="text-8xl mb-4">🎒</div>
            <motion.div 
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 text-sm font-semibold"
              animate={{ 
                boxShadow: ["0 0 20px rgba(255,255,255,0.3)", "0 0 40px rgba(255,255,255,0.1)", "0 0 20px rgba(255,255,255,0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <SafeIcon icon={FiZap} className="w-4 h-4" />
              <span>Real-time Updates</span>
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Walang Pasok
            </span>
            <br />
            <span className="text-white text-4xl md:text-5xl font-medium">
              Philippines
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your most trusted source for <span className="text-yellow-300 font-semibold">real-time school updates</span> 
            from verified government sources 🏛️
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div 
              className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-3">Lightning Fast</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Get updates in seconds, not hours. We monitor 24/7 so you don't have to!
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-bold text-lg mb-3">100% Verified</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Only official sources: DepEd, PAGASA, and LGU announcements you can trust
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="font-bold text-lg mb-3">Made with Love</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Built by Filipinos, for Filipinos. Keeping families informed and safe
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full px-8 py-4 font-bold text-lg shadow-2xl"
              whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              🚀 Start Searching Now
            </motion.div>
            <div className="text-sm text-blue-200 font-medium">
              <SafeIcon icon={FiHeart} className="w-4 h-4 inline mr-2" />
              Trusted by 100,000+ Filipino families
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
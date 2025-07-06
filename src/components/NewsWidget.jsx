import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { fetchSchoolNews } from '../services/api';

const { FiExternalLink, FiClock, FiRefreshCw, FiTrendingUp } = FiIcons;

function NewsWidget({ city }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchSchoolNews(city);
      setNews(data);
    } catch (err) {
      setError('Failed to fetch news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [city]);

  if (!city) return null;

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="text-3xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📰
          </motion.div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Latest News
            </h3>
            <p className="text-gray-600 font-medium">Related to {city}</p>
          </div>
        </div>
        <motion.button
          onClick={fetchNews}
          disabled={loading}
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg disabled:opacity-50 hover:from-blue-600 hover:to-purple-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SafeIcon icon={FiRefreshCw} className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <motion.div 
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 font-medium">Loading latest news...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">😔</div>
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {news.slice(0, 3).map((article, index) => (
          <motion.div
            key={article.id}
            className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-start space-x-4">
              {article.urlToImage && (
                <motion.img 
                  src={article.urlToImage} 
                  alt={article.title}
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0 shadow-md"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-800 text-lg mb-2 leading-tight">
                  {article.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <div className="text-base">📅</div>
                      <span className="font-medium">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="text-base">📡</div>
                      <span className="font-medium">{article.source}</span>
                    </div>
                  </div>
                  <motion.a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Read More</span>
                    <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {news.length === 0 && !loading && !error && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">No Recent News</h3>
          <p className="text-gray-600 font-medium">No recent news found for {city}</p>
        </div>
      )}

      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-blue-600" />
          <p className="text-sm font-medium text-blue-800">
            <strong>Stay Updated:</strong> We aggregate news from verified sources to keep you informed! 📱
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default NewsWidget;
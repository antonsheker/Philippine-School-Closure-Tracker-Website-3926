import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiExternalLink, FiShield, FiGlobe, FiFileText } = FiIcons;

const officialSources = [
  {
    name: 'Department of Education (DepEd)',
    description: 'Official announcements from DepEd Central and Regional Offices',
    url: 'https://www.deped.gov.ph',
    type: 'Government Agency'
  },
  {
    name: 'PAGASA Weather Bureau',
    description: 'Weather advisories and storm warnings',
    url: 'https://www.pagasa.dost.gov.ph',
    type: 'Weather Service'
  },
  {
    name: 'National Disaster Risk Reduction and Management Council',
    description: 'Disaster-related school suspension announcements',
    url: 'https://ndrrmc.gov.ph',
    type: 'Emergency Management'
  },
  {
    name: 'Local Government Units (LGUs)',
    description: 'City and municipal government announcements',
    url: '#',
    type: 'Local Government'
  },
  {
    name: 'Office of the President',
    description: 'Presidential proclamations and national announcements',
    url: 'https://www.officialgazette.gov.ph',
    type: 'Executive Office'
  },
  {
    name: 'Regional DepEd Offices',
    description: 'Regional education office announcements',
    url: 'https://www.deped.gov.ph/regional-offices/',
    type: 'Regional Education'
  }
];

function SourcesSection() {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="sources"
    >
      <div className="flex items-center space-x-3 mb-6">
        <SafeIcon icon={FiShield} className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Official Sources</h3>
      </div>

      <div className="space-y-4">
        {officialSources.map((source, index) => (
          <motion.div
            key={source.name}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiGlobe} className="w-4 h-4 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">{source.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">{source.description}</p>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {source.type}
                </span>
              </div>
              {source.url !== '#' && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiFileText} className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900 mb-1">Verification Process</h4>
            <p className="text-sm text-green-800">
              All announcements are verified against multiple official sources before publication. 
              We cross-reference information from government agencies, weather services, and local authorities.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiShield} className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">How to Verify</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Check your local DepEd office website</li>
              <li>• Monitor your city/municipal government social media</li>
              <li>• Watch for PAGASA weather bulletins</li>
              <li>• Listen to official radio/TV announcements</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SourcesSection;
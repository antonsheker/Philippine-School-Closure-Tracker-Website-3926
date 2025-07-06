# Walang Pasok Philippines - Real-time School Suspension Updates

A comprehensive web application that provides real-time school suspension updates for Philippine cities and municipalities using official government sources.

## Features

### 🏫 Real-time Data Sources
- **DepEd Regional Offices** - Official education department announcements
- **Local Government Units (LGUs)** - Mayor and city government announcements
- **PAGASA Weather Bureau** - Weather-based suspension recommendations
- **NDRRMC** - National disaster-related announcements
- **News Aggregation** - Verified news sources for additional context

### 📱 User Interface
- **City Search** - Search through 50+ Philippine cities
- **Live Weather Data** - Real-time weather conditions from OpenWeatherMap
- **Emergency Contacts** - Local DepEd and government contact information
- **News Widget** - Related news articles about school suspensions
- **Auto-refresh** - Automatic updates every 5 minutes

### 🔍 Data Verification
- Multiple source cross-referencing
- Verification badges for confirmed announcements
- Direct links to official sources
- Real-time weather-based alerts

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### API Keys Required
1. **OpenWeatherMap API Key**
   - Sign up at https://openweathermap.org/api
   - Replace `your-openweather-api-key` in `src/services/api.js`

2. **News API Key**
   - Sign up at https://newsapi.org/
   - Replace `your-news-api-key` in `src/services/api.js`

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your API keys to `src/services/api.js`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Data Sources

### Official Government Sources
- **DepEd Philippines**: https://www.deped.gov.ph
- **PAGASA**: https://www.pagasa.dost.gov.ph
- **NDRRMC**: https://ndrrmc.gov.ph
- **Official Gazette**: https://www.officialgazette.gov.ph

### API Integrations
- **OpenWeatherMap**: Real-time weather data
- **News API**: School suspension news aggregation
- **Custom scrapers**: Government website monitoring

## Technical Architecture

### Frontend
- **React 18** with functional components
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **React Router** for navigation

### Data Layer
- **Real-time API calls** to multiple sources
- **Auto-refresh mechanisms** for live updates
- **Error handling** and fallback systems
- **Data aggregation** and deduplication

### Components
- `AnnouncementList` - Real-time announcements display
- `WeatherWidget` - Live weather data
- `NewsWidget` - Related news articles
- `EmergencyContacts` - Local government contacts
- `CitySearch` - City selection interface

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your improvements
4. Submit a pull request

## Disclaimer

This application aggregates information from official sources. Always verify with your local DepEd office, school administration, or local government for the most current and accurate information.

## License

MIT License - see LICENSE file for details
# Cryptocurrency Dashboard

A modern, responsive cryptocurrency dashboard built with React, Redux, and Chart.js. This application provides real-time cryptocurrency data, interactive charts, and market insights.

## Features

- 📊 Real-time cryptocurrency price tracking
- 📈 Interactive price charts with multiple timeframes
- 💱 Currency conversion support
- 📱 Responsive design for all devices
- 🔍 Search functionality for cryptocurrencies
- 📊 Market cap rankings
- 💹 Price change indicators
- 🎨 Multiple chart types (Line and Bar charts)

## Technologies Used

- React.js
- Redux Toolkit for state management
- Chart.js for data visualization
- Tailwind CSS for styling
- CoinGecko API for cryptocurrency data
- React Router for navigation
- React Icons for UI icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-dashboard.git
```

2. Navigate to the project directory:
```bash
cd crypto-dashboard
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and visit `http://localhost:5173`

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # React components
│   ├── UI/         # Reusable UI components
│   └── ...         # Feature-specific components
├── store/          # Redux store and slices
├── util/           # Utility functions and constants
└── App.jsx         # Main application component
```

## Key Components

### MainChart
- Displays interactive price charts
- Supports multiple timeframes (1D, 1W, 1M, 6M, 1Y)
- Multiple chart types (Line and Bar charts)
- Real-time data updates

### MarketcapSideBar
- Shows top cryptocurrencies by market cap
- Pagination support
- Price change indicators
- Responsive design

### Exchange
- Currency conversion functionality
- Real-time exchange rates
- Support for multiple currencies

## API Integration

The application uses the CoinGecko API for cryptocurrency data:
- Price data
- Market cap information
- Historical data
- Exchange rates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- CoinGecko API for providing cryptocurrency data
- React and Redux communities
- Chart.js for visualization capabilities
- Tailwind CSS for styling utilities

## Contact

Kaustubh Dengle - [LinkedIn](https://www.linkedin.com/in/kaustubhdengle/)

Project Live Link: [CryptoMetrics](https://cryptometricsksd.netlify.app/)

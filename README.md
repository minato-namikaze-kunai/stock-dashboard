# Candlestick & Volume Charting App

This is a React-based web application that visualizes **IBM stock data** using **candlestick** and **volume bar charts**. It uses data from [Alpha Vantage](https://www.alphavantage.co/) (demo API key) and charts from [ApexCharts](https://apexcharts.com/).

## 🔧 Features

- 📊 **Candlestick chart** for 5-minute intervals
- 🕐 **Hourly candlestick** and **volume charts**
- 📅 **Daily chart** integration (scaffolded)
- 🧭 Navigation between views using React Router
- 💅 Responsive layout with Tailwind CSS

## 📁 Folder Structure

```
src/
├── api/
│   ├── apiCandleStick.js
│   └── apiVolume.js
├── components/
│   └── Navbar.jsx
├── pages/
│   ├── 5minCandleVolume.jsx
│   ├── HourlyCandleVolume.jsx
│   └── DailyCandleVolume.jsx
├── App.jsx
├── Layout.jsx
├── index.js
└── index.css
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

```bash
npm run dev
```

Open your browser and visit `http://localhost:5173` (or the port shown in the terminal).

## 🧪 API Reference

- This project uses the **Alpha Vantage Demo API key**, which may have limited usage. You can replace it with your own key by updating:

```js
https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&...
```

in `apiCandleStick.js` and other fetch calls.

## 🖼 Sample Visuals

- Candlestick chart shows OHLC data per interval
- Volume bar chart shows trading volume

## 📦 Built With

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [ApexCharts](https://apexcharts.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 📄 License

MIT License. Free to use and modify.

---

> Developed for educational and demonstration purposes.

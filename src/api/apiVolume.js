const fetchVolume= async () => {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=demo`);
    const result = await response.json();
    const timeSeriesData = result['Time Series (5min)'];
  
    const data = Object.keys(timeSeriesData).map(key => {
      const entry = timeSeriesData[key];
      return {
        x: new Date(key).getTime(),
        y: parseFloat(entry['5. volume'])
      };
    });
  
    return data;
  };
  
  export { fetchVolume };
  
/* eslint-disable no-dupe-keys */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchCandle } from '../api/apiCandleStick.js';

const CandlestickChart = () => {
  const [error, setError] = useState(false)
  const [data, setdata] = useState([])
  useEffect(() => {
    (async () => {
      try {
        setError(false);
        const fetchedData = await fetchCandle();
        setdata(fetchedData);
      } catch (error) {
        setError(true);
      }
    })();
  }, []);

  
  const options = {
    series: [{
      data: data.map(dataPoint => ({
        x: new Date(dataPoint['x']),
        y: [dataPoint['y'][0], dataPoint['y'][1], dataPoint['y'][2], dataPoint['y'][3]]
      }))
    }],
    chart: {
      type: 'candlestick',
      height: 300,
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: 'pan'
    }
    },
    title: {
      text: 'Candlestick Chart',
      align: 'left',
    style: {
      fontSize: '20px', 
      fontWeight: 'bold', 
      color: 'rgb(128, 203, 196)'
    },
    },
    xaxis: {
      type: 'datetime',
      min: new Date(2009, 0, 30, 8, 0).getTime(), 
      max: new Date(2009, 0, 30, 17, 0).getTime(), 
      labels:{
        style: {
          fontSize: '15px', 
          fontWeight: 'bold', 
        }
      },
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      min: 45, 
      max: 55, 
      labels:{
        style: {
          fontSize: '15px', 
          fontWeight: 'bold', 
        }
      }
    }
    
    
  };
 

  return (
    <Chart
      options={options}
      series={options.series}
      type="candlestick"
      height={450}
    />
  );
};

export default CandlestickChart;

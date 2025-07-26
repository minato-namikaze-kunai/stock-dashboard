/* eslint-disable no-dupe-keys */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const HourlyChart = () => {
  const [error, setError] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      try {
        setError(false)
        const fetchData = async () => {
          const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=demo');
          const result = await response.json();
          const timeSeriesData = result['Time Series (5min)'];
            const times = [
              9 * 60 * 60 * 1000, // 9:00:00
              8 * 60 * 60 * 1000, // 8:00:00
              10 * 60 * 60 * 1000, // 10:00:00
              11 * 60 * 60 * 1000, // 11:00:00
              12 * 60 * 60 * 1000, // 12:00:00
              13 * 60 * 60 * 1000, // 13:00:00
              14 * 60 * 60 * 1000, // 14:00:00
              15 * 60 * 60 * 1000, // 15:00:00
              16 * 60 * 60 * 1000, // 16:00:00
              17 * 60 * 60 * 1000, // 17:00:00
            ];
            const newData = {};
            for (let index = 0; index <  Object.keys(timeSeriesData).length; index++) {
              const temp = Object.keys(timeSeriesData)[index];
              const part = temp.split(" ");
              const time = part[1];
              const [hours, minutes, seconds] = time.split(":");
              const milliSec = (parseInt(hours) * 60 * 60 + parseInt(minutes) * 60 + parseInt(seconds)) * 1000;
              if (times.includes(milliSec)) {
                const key = Object.keys(timeSeriesData)[index];
                const milliSeconds = new Date(key).getTime();
                const open = parseFloat(timeSeriesData[key]['1. open']);
                const closingTime = milliSeconds + 55 * 60000;
                const date = new Date(closingTime);
                const formattedDateTime = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
                const close = parseFloat(timeSeriesData[formattedDateTime]?.['4. close']);
                if (close !== undefined) {
                  newData[index] = {
                    x: milliSeconds,
                    y: [open, parseFloat(timeSeriesData[key]['2. high']), parseFloat(timeSeriesData[key]['3. low']), close]
                  };
                }
              }
            }
            setData(Object.values(newData));
        };
    
        fetchData();
      } catch (error) {
        setError(true)
      }
    })()
  }, [])

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
      min: new Date(2009, 0, 30, 9, 0).getTime(),
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

export default HourlyChart;

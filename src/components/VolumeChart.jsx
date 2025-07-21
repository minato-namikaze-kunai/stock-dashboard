/* eslint-disable no-unused-vars */
import Chart from 'react-apexcharts';
import React, { useEffect, useState } from 'react';
import { fetchVolume } from '../api/apiVolume.js';

function VolumeChart() {
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        const fetchedData = await fetchVolume();
        setData(fetchedData);
      } catch (error) {
        setError(true);
      }
    })();
  }, []);

  const options = {
    series: [{
      data: data
    }],
    chart: {
      type: 'bar',
      height: 200,
      toolbar: {    
        autoSelected: 'pan'
      },
      pan: {
        enabled: true,
        type: 'x' 
      },
    },
    title: {
      text: 'Volume Chart',
      align: 'left',
    style: {
      fontSize: '20px', 
      fontWeight: 'bold', 
      color: 'rgb(128, 203, 196)'
    }
    },
    xaxis: {
      type: 'datetime',
      min: new Date(2009, 0, 30, 8, 0).getTime(), 
      max: new Date(2009, 0, 30, 17, 0).getTime(), 
      labels : {
        style: {
          fontSize: '15px', 
          fontWeight: 'bold', 
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true,
        formatter: function (value) {
          return value.toFixed(2); 
        }
      },
      min: 0, 
      max: Math.max(...data.map(item => item.y)), 
      labels : {
        style: {
          fontSize: '13px', 
          fontWeight: 'bold', 
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
        colors: {
          ranges: [{
            from: -1000,
            to: 0,
            color: '#F15B46'
          }, {
            from: 1,
            to: 10000,
            color: '#FEB019'
          }],
        },
      }
    },
    
  };

  return (
    <Chart
      options={options}
      series={options.series}
      type="bar"
      height={200}
    />
  );
}

export default VolumeChart;

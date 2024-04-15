/* This file consists of an exported function that retrieves required data from
  the FireStore Database and creates, configures, and populates a line graph to add to the DOM */
import { getTemps } from './dbFunctions.js';

export async function buildChart(code) {
  // Configure data for Chart Population
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Average Temperatures (°F)',
        data: await getTemps(`${code}`),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  };

  // Configure chart attributes
  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Avg. Monthly Temperatures in State Capital'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  
  const ctx = document.getElementById('myChart'); // Replace with correct chart ID

  // Generate Chart
  new Chart(ctx, config);
}




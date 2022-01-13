import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement,
        CategoryScale,
        LinearScale
    );

const BarChart = () => {

    const [chartData, setChartData] = useState({});

    var baseUrl = "https://api.coinranking.com/v2/coins?limit=10";
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    var apikey = "coinranking07fa32ecda1352b50716705dfe79452a5beb82a0ea1051e5";

      useEffect(() => {
        const fetchCoins = async () => {
          await fetch(`${proxyUrl}${baseUrl}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${apikey}`,
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then((response) => {
              if (response.ok) {
                response.json().then((json) => {
                  console.log(json.data);
                  setChartData(json.data);
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        };
        fetchCoins();
      }, [baseUrl, proxyUrl, apikey]);

      

  var data = {
    labels: chartData?.coins?.map((coin) => coin.name),
    datasets: [
      {
        label: `${chartData?.coins?.length} Coins Available`,
        data: chartData?.coins?.map((coin) => coin.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
        labels: {
            fontSize: 26,
        }
    },
        
  };

  return (
        <div>
            <Bar data={data} options={options} height={400}/>
        </div>  
  )
};

export default BarChart;

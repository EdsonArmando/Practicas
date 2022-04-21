import React, { useEffect, useState } from 'react';
import '../../src/App.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Top 3 de los Juegos',
    },
  },
};

const api_host = 'https://backenrust-e7sdavxvpa-uc.a.run.app/';
function Top3() {
  const [info, setinfo] = useState([]);
  const getDatos = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('En ejecucion Reportes Top3 MongoDB');
    const response = await fetch(`${api_host}/getTop3`, requestOptions);
    const json = await response.json();
    setinfo(json);
  };
  useEffect(() => {
    //setInterval(() =>{
      getDatos();
    //},3000);
  }, []);
  const labels =  info.map((item) => {
    return item.game_name;
  });
  //const labels = porcentajeMemoria1.map((item) => {
    //return item + "%";
  //});
  const data = {
    labels,
    datasets: [
      {
        label: 'Cantidad ',
        data: info.map((item) => {
          return item.Total;
        }),
        backgroundColor: 'rgba(255, 100, 132, 0.5)',
      }
    ],
  };
  return (
    <>
    <h1>Grafica Top 3 de los Juegos</h1>
    <div className="borrow">
      <div className="maindiv">
        <h1>Top 3</h1>
        <Bar options={options} data={data} />
      </div>
    </div>
    </>
  );
}

export default Top3;
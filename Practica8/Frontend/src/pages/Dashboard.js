import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react';

const api_host = 'http://34.121.46.185:3004';
function Dashboard() {
  const [info, setinfo] = useState([]);
  const getDatos = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('Logs de MongoDB');
    const response = await fetch(`${api_host}/getContador`, requestOptions);
    const json = await response.json();
    setinfo(json);
  };
  useEffect(() => {
    //setInterval(() =>{
      getDatos();
    //},3000);
  }, []);
  return (
    <>
    <div className="dashboard">
        <div className="maindiv">
            <Container fluid>
                <h1>Practica 8 SA</h1>
                <h1>Contador: {info.contador}</h1>
            </Container>
        </div>
    </div>
    </>
  );
}
export default Dashboard;
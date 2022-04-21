import React, { useEffect, useState } from 'react';
const api_host = 'https://backenrust-e7sdavxvpa-uc.a.run.app/';
function LIstaLogs() {
  const [info, setinfo] = useState([]);
  const getDatos = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('Logs de MongoDB');
    const response = await fetch(`${api_host}/getData`, requestOptions);
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
    <h1>Logs</h1>
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">game_id</th>
          <th scope="col">game_name</th>
          <th scope="col">winner</th>
          <th scope="col">queue</th>
          <th scope="col">fecha</th>
        </tr>
      </thead>
      <tbody>
      {info.map((val) => {
          return (
            <tr>
              <th scope="row">{val.game_id}</th>
              <td>{val.game_name}</td>
              <td>{val.winner}</td>
              <td>{val.queue}</td>
              <td>{val.fecha_hora}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  );
}

export default LIstaLogs;

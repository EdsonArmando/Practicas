import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

import './GameResult.css'

const ENDPOINT = 'https://proyectos-usac.ue.r.appspot.com/';

function GamesResult(){

    const [GamesResults, setGamesResults] = useState([]);
    const [topBestPlayers, setTopBestPlayers] = useState([]);

    useEffect( ()=>{
        const socket = socketIOClient(ENDPOINT);
        
        var intervalo = setInterval(()=>{

            console.log("Enviando peticion jiji");  

            socket.emit('getTopLastGames',{ "top": 10 });

            socket.emit('getTopTenBestPlayers',{});

        }, 1000);

        socket.on('topLastGames', (registros)=>{
            
            setGamesResults(registros);
        });

        socket.on('topTenBestPlayers', (registros)=>{
            //console.log(registros);
            setTopBestPlayers(registros);
        });

        return ()=>{clearInterval(intervalo)}
    }, []);

    
    return( 
        <div className="main">
            <h1>Usac Squid Game</h1>
            
            <div className="tidb">
                <h1>TiDB</h1>
                <hr/>
                <div className="column">
                  <h3>Last 10 Games</h3>
                  <table className="table table-hover">
                    <thead>
                    <tr>
                      <th scope="col">Game#</th>
                      <th scope="col">Player#</th>
                      <th scope="col">Game name</th>
                      <th scope="col">Fecha y hora</th>
                    </tr>
                    </thead>
                    <tbody>
                    {GamesResults.map((game,index) => {
                        return (
                        <tr key={index}>
                            <th scope="row">{game.game_id}</th>
                            <td>{game.players}</td>
                            <td>{game.game_name}</td>
                            <td>{(new Date(game.fecha_hora).toLocaleString())}</td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </table>     
                </div>
                <div className="column">
                  <h3>Top 10 Players</h3>
                  <table className="table table-hover">
                    <thead>
                    <tr>
                      <th scope="col">Id Jugador</th>
                      <th scope="col">Cantidad de Victorias</th>
                    </tr>
                    </thead>
                    <tbody>
                    {topBestPlayers.map((player,index) => {
                        return (
                        <tr key={index}>
                            <th scope="row">{player.winner}</th>
                            <td>{player.victories}</td>
                         </tr>
                      )
                    })}
                    </tbody>
                  </table>
                </div>   
            </div>
        </div>
        
    );
    
}

export default GamesResult;
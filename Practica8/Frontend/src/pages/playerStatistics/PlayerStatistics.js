import {Listbox, ListboxOption } from "@reach/listbox";
import "@reach/listbox/styles.css";
import { useState, useEffect } from "react";
import socketIOClient from 'socket.io-client';

import './PlayerStatistics.css'

const ENDPOINT = 'https://proyectos-usac.ue.r.appspot.com/';

function PlayerStatistics(){
    
    const [allPlayers, setAllPlayers] = useState([]);
    const [player, setPlayer] = useState("none");
    const [playerNumberOfWinsPerGame, setPlayerNumberOfWinsPerGame] = useState([]);
    const [playerTotalGamesWon, setPlayerTotalGamesWon] = useState(0);
    const [playerNumberOfLossPerGame, setPlayerNumberOfLossPerGame] = useState([]);
    const [playerTotalLostGames, setPlayerTotalLostGames] = useState(0);
    

    useEffect( ()=>{
        
        const socket = socketIOClient(ENDPOINT);
        var intervalo = setInterval(()=>{

            socket.emit('getAllPlayers', {});

            if(player !== "none"){
                socket.emit('getPlayerStatistics', {
                    "playerId": player
                });
            }

        }, 700);

        socket.on('allPlayers', (registros)=>{
            
            setAllPlayers(registros);
            console.log(registros);
        });

        socket.on('PlayerNumberOfWinsPerGame', (registros)=>{
            //console.log(registros);
            setPlayerNumberOfWinsPerGame(registros);

            let totalGamesWon = 0; 
            registros.map((dato)=>{
                totalGamesWon = totalGamesWon + dato.nro_veces_ganadas;
            });
            setPlayerTotalGamesWon(totalGamesWon);
            //console.log(totalGamesWon);
            
        });

        socket.on('PlayerTotalLostGames', (registro)=>{
            //console.log(registro);
            setPlayerTotalLostGames(registro.total_juegos_perdidos);
        });

        socket.on('PlayerNumberOfLossPerGame', (registros)=>{
            //console.log(registros);
            setPlayerNumberOfLossPerGame(registros);
        });



        return ()=>{clearInterval(intervalo)}

    }, [player]);
    
    return (

        <div>
          <Listbox id="combo" defaultValue="none" onChange={setPlayer}>
            <ListboxOption value="none">choose player</ListboxOption>
            {
                allPlayers.map( function(player, index){
                    return(
                        <ListboxOption key={index} value={String(player.winner)}>{player.winner}</ListboxOption>
                    )
                })
            }
          </Listbox>

          <div className="tidb">
                <h1>TiDB</h1>
                <hr/>
                <h2 id="jugadorActual">Estadisticas del Jugador: {player}</h2>
                <div className="column">
                  <h3>Total de Juegos Ganados</h3>
                  <h2 id="victorias">{playerTotalGamesWon}</h2>
                  <h3>Detalle de Partidas</h3>
                  <table className="table table-hover">
                    <thead>
                    <tr>
                      <th scope="col">Game ID</th>
                      <th scope="col">Game name</th>
                      <th scope="col">Cantidad de veces ganadas</th>
                    </tr>
                    </thead>
                    <tbody>
                    {playerNumberOfWinsPerGame.map((game,index) => {
                        return (
                        <tr key={index}>
                            <th scope="row">{game.game_id}</th>
                            <td>{game.game_name}</td>
                            <td>{game.nro_veces_ganadas}</td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </table>     
                </div>
                <div className="column">
                  <h3>Total de Juegos perdidos</h3>
                  <h2 id="perdidas">{playerTotalLostGames}</h2>
                  <h3>Detalle de Partidas</h3>
                  <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Game ID</th>
                      <th scope="col">Game name</th>
                      <th scope="col">Cantidad de veces Perdidas</th>
                    </tr>
                    </thead>
                    <tbody>
                    {playerNumberOfLossPerGame.map((game,index) => {
                        return (
                        <tr key={index}>
                            <th scope="row">{game.game_id}</th>
                            <td>{game.game_name}</td>
                            <td>{game.nro_veces_perdidas}</td>
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

export default PlayerStatistics;
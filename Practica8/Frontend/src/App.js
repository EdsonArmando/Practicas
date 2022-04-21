import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import Top3 from "./pages/Top3Mongo";
import Kafka_Rabbit from "./pages/Kafka_Rabbit";
import LIstaLogs from "./pages/Logs";

import GamesResult      from "./pages/gamesResult/GamesResult";
import PlayerStatistics from "./pages/playerStatistics/PlayerStatistics";
import './App.css'


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/GamesResult" exact element={<GamesResult />} />
          <Route path="/PlayerStatistics" exact element={<PlayerStatistics />} />
          <Route path="/GraficaTop3" exact element={<Top3 />} />
          <Route path="/GraficaKafka_Rabbit" exact element={<Kafka_Rabbit />} />
          <Route path="/LogsMongoDB" exact element={<LIstaLogs />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
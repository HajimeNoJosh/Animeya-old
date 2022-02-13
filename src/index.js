import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';

import './sass/main.scss';

import { HomepageOwner } from './Components/HomepageOwner/HomepageOwner';
import { Room } from './Components/Room/Room';
import { RoomMatch } from './Components/RoomMatch/RoomMatch';
import actionCable from 'actioncable'
import { HomepageVisitor } from './Components/HomepageVisitor/HomepageVisitor';
const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable') // change to whatever port your server uses

const App = () => {

  const [room, setRoom] = useState({});
  const [roomId, setRoomId] = useState(0);
  const [myToken, setMyToken] = useState('');
  const [anime, setAnime] = useState([]);
  const [num, setNum] = useState(0);
  const [matchedAId, setMatchedAId] = useState();
  

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <HomepageOwner
            setRoomId={setRoomId}
            setRoom={setRoom}
            setMyToken={setMyToken}
            setAnime={setAnime}
          />
        </Route>
        <Route exact path="/room/match/">
          <RoomMatch matchedAId={matchedAId} />
        </Route>
        <Route exact path="/room/:token">
          <Room
            cable={CableApp.cable}
            room={room}
            setRoom={setRoom}
            room_id={roomId}
            setRoomId={setRoomId}
            anime={anime}
            user_token={myToken}
            setAnime={setAnime}
            setNum={setNum}
            num={num}
            setMatchedAId={setMatchedAId}
          />
        </Route>
        <Route path="/join/:token/">
          <HomepageVisitor setRoomId={setRoomId} setRoom={setRoom} setMyToken={setMyToken} setAnime={setAnime} />
        </Route>

        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </HashRouter>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root'));
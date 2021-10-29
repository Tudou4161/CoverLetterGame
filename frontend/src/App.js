import React, {useState, useEffect} from "react";
import { useHistory } from "react-router";
import {Link, Route, Switch} from "react-router-dom";

import './App.css';
import axios from "axios";
import Login from "./components/login"
import Main from "./components/main";
import Detail from "./components/detail";

function App() {

  let [ userName, userNameSetting ] = useState("");

  const uNameChange = (text) => {
    userNameSetting(text);
  };

  let history = useHistory();

  useEffect(() => {
    axios.get("/api/v1/user/tokenCheck").then((res) => {
      userNameSetting(res.data.id);
    }).catch((err) => {
      const errStatus = err.response;
      if (errStatus.data.code === 419) {
        history.push("/");
      }
    });
    },[])

  return (
    <div className="App">
      <div className="header-items">
        <div className="header-item"><h3>🟡🔺🟩</h3></div>
        <div className="header-item"><h3>자소설게임</h3></div>
        <div className="username">
          {
            (userName === "")? null : <h5>{userName} 님 환영합니다.</h5>
          }
        </div>
      </div>

      <Route exact path="/">
        <Login nameChange={uNameChange} />
      </Route>

      <Route exact path="/main">
        <Main />
      </Route>

      <Route exact path="/detail/:id">
        <Detail />
      </Route>
    </div>
  );
}

export default App;

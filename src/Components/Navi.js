import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainContent from "./MainContent";
import Buy from "./Buy";
import Raport from "./Raport";
import Read from "./Read";

function Navi() {

  return (
    <Router>   
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <div className="collapse navbar-collapse" id="navbarNav">

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/read">Lue</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/reader">Lue (uusi)</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/buy">Osta lippuja</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/raport">Raportit</a>
                    </li>
                </ul>
            </div>

        </nav> 

        <Switch>
          <Route path="/read">
            <MainContent />
          </Route>
          <Route path="/buy">
            <Buy />
          </Route>
          <Route path="/raport">
            <Raport />
          </Route>
          <Route path="/reader">
            <Read />
          </Route>
        </Switch>

        </div>
    </Router>
  );
}

export default Navi;

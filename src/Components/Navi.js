import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainContent from "./MainContent";
import Buy from "./Buy";
import Raport from "./Raport";

function Navi() {

  return (
    <Router>   
        <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">

            <div class="collapse navbar-collapse" id="navbarNav">

                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/read">Lue</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/buy">Osta lippuja</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/raport">Raportit</a>
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
        </Switch>

        </div>
    </Router>
  );
}

export default Navi;

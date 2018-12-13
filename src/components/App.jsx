import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Footer } from '.';
import Game from './game/Game';

import './less/App.less';

function App() {
    return (
        <Router basename="/">
            <div className="app">
                <Header />
                <div className="app__container">
                    <Switch>
                        <Route exact path="/" component={Game} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

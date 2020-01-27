import React, { Component } from 'react'; // Brings React and Component into component

import './App.css';

import Search from '../Search/Search';
import CountryDisplay from '../CountryDisplay/CountryDisplay';

// Base or root component to be rendered from ../../index.js
class App extends Component {
    render() {
        return (
            <>
                <div>
                    <h1>Country Search</h1>
                </div>
                <div>
                    <Search />
                </div>
                <div>
                    <CountryDisplay />
                </div>
            </>
        )
    }
} // End App component

export default App;
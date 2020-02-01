import React, { Component } from 'react'; // Brings React and Component into component
import { connect } from 'react-redux';

import './App.css';

import Search from '../Search/Search';
import CountryDisplay from '../CountryDisplay/CountryDisplay';

// Base or root component to be rendered from ../../index.js
class App extends Component {
    render() {
        return (
            <div className="app-wrapper">
                <div>
                    <Search />
                </div>
                { this.props.reduxState.currentCountries.search &&
                <div>
                    <CountryDisplay />
                </div>
                }
            </div>
        )
    }
} // End App component

// Provides reduxState to component through props
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(App)
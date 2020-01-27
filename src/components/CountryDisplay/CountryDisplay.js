import React, { Component } from 'react'; // Brings React and Component into component
import { connect } from 'react-redux';


class CountryDisplay extends Component {

    state = {
        searchInput: '',
    }

    handleChangeForSearch = (event) => {
        this.setState({
            searchInput: event.target.value,
        });
    }

    handleSearchSubmit = () => {
        this.props.dispatch({ type:'SEARCH_COUNTRIES', payload: this.state });
    }

    render() {
        return (
            <>
                <div>
                    <h3>This is where data will be displayed</h3>
                </div>
            </>
        )
    }
} // End App component

// Provides reduxState to component through props
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(CountryDisplay)
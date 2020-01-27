import React, { Component } from 'react'; // Brings React and Component into component
import { connect } from 'react-redux';

class Search extends Component {

    state = {
        searchInput: '',
    }

    handleChangeForSearch = (event) => {
        this.setState({
            searchInput: event.target.value,
        });
    }

    handleSearchSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type:'SEARCH_COUNTRIES', payload: this.state });
    }

    render() {
        return (
            <>
                <div>
                    <form
                        onSubmit={this.handleSearchSubmit}
                    >
                        <label htmlFor='countryInput'>
                            Search Countries:
                        </label>
                        <input
                            id='countryInput'
                            name='countryInput'
                            placeholder='eg. USA, 3166-1, Minnesota...'
                            type='text'
                            onChange={this.handleChangeForSearch}
                        />
                        <input
                            id='countrySubmitButton'
                            name='countrySubmit'
                            type='submit'
                            value='Submit'
                        />
                    </form>
                </div>
            </>
        )
    }
} // End App component

export default connect()(Search);
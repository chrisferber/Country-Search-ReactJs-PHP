import React, { Component } from 'react'; // Brings React and Component into component
import { connect } from 'react-redux';

// Material UI styling components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
                            <h1>Search Countries:  </h1>
                        </label>
                        <TextField
                            id='countryInput'
                            name='countryInput'
                            placeholder='eg. USA, Argentina...'
                            type='text'
                            onChange={this.handleChangeForSearch}
                        />
                        <Button type='submit' value='Submit' color='primary' variant='outlined'>
                        Submit
                        </Button>
                    </form>
                </div>
            </>
        )
    }
} // End Search component

export default connect()(Search);
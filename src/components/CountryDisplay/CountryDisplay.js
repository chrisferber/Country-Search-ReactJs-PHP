import React, { Component } from 'react'; // Brings React and Component into component
import { connect } from 'react-redux';

// imports Material UI components needed to create custom tables
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// CountryDisplay component will map through search results and display them on the DOM in a MUI table.
class CountryDisplay extends Component {

    state = {
        countries: '',
    }

    componentDidMount() {
        this.parseCurrentCountriesReducer();
    }

    parseCurrentCountriesReducer = () => {
        this.setState({
            countries: this.props.reduxState.currentCountries,
        });
        console.log('in parseCurrentCountriesReducer function, this.state is:', this.state);
    }

    // Material UI setup from documentation that will be used by other Material UI components to correctly format tables
    useStyles = () => {
        makeStyles({
            root: {
                width: '100%',
                overflowX: 'auto',
            },
            table: {
                minWidth: 650,
            },
        });
    } // End useStyles function

    render() {
        return (
            <>
                <Paper className={this.useStyles.root}>
                    <Table className={this.useStyles.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><h2>Name</h2></TableCell>
                                <TableCell align="right"><h2>Flag</h2></TableCell>
                                <TableCell align="right"><h2>AlphaCode2</h2></TableCell>
                                <TableCell align="right"><h2>AlphaCode3</h2></TableCell>
                                <TableCell align="right"><h2>Population</h2></TableCell>
                                <TableCell align="right"><h2>Region</h2></TableCell>
                                <TableCell align="right"><h2>Subregion</h2></TableCell>
                                <TableCell align="right"><h2>Languages</h2></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* maps through currentCountriesReducer to populate table body with search results */}
                            {this.props.reduxState.currentCountries.countries.map(country => (
                                <TableRow key={country.alphaCode2} className="country-table-rows">
                                    <TableCell component="th" scope="country" className="country-table-cell">
                                        {country.name}
                                    </TableCell>
                                    <TableCell align="right"><img src={country.flag} width="300px"/></TableCell>
                                    <TableCell align="right">{country.alphaCode2}</TableCell>
                                    <TableCell align="right">{country.alphaCode3}</TableCell>
                                    <TableCell align="right">{country.population}</TableCell>
                                    <TableCell align="right">{country.region}</TableCell>
                                    <TableCell align="right">{country.subregion}</TableCell>
                                    <TableCell align="right">{country.languages.map(language => (
                                        <p key={language}>{language},</p>
                                    ))}</TableCell>
                                </TableRow>
                            )
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </>
        )
    }
} // End CountryDisplay component

// Provides reduxState to component through props
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(CountryDisplay)
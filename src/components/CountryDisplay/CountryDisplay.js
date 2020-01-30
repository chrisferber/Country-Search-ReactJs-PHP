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

// CountryDisplay component will map through search results and display them on the DOM in a table.
class CountryDisplay extends Component {

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
                                <TableCell>Username</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Flag</TableCell>
                                <TableCell align="right">AlphaCode2</TableCell>
                                <TableCell align="right">AlphaCode3</TableCell>
                                <TableCell align="right">Population</TableCell>
                                <TableCell align="right">Region</TableCell>
                                <TableCell align="right">Subregion</TableCell>
                                <TableCell align="right">Languages</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* maps through currentCountriesReducer to populate table body with search results */}
                            {/* this.props.reduxState.currentCountries.map((country) => ( */}
                                <TableRow>
                                    <TableCell component="th" scope="country">
                                        {this.props.reduxState.currentCountries.name}
                                    </TableCell>
                                    <TableCell align="right">{this.props.reduxState.currentCountries.flag}</TableCell>
                                    <TableCell align="right">{this.props.reduxState.currentCountries.alphaCode2}</TableCell>
                                    <TableCell align="right">{this.props.reduxState.currentCountries.alphaCode3}</TableCell>
                                    <TableCell align="right">{this.props.reduxState.currentCountries.population}</TableCell>
                                    <TableCell align="right">{this.props.reduxState.currentCountries.region}</TableCell>
                                    <TableCell align="right">{this.props.reduxState.currentCountries.subregion}</TableCell>
                                    <TableCell align="right">{this.props.reduxState.currentCountries.languages}</TableCell>
                                </TableRow>
                            
                        </TableBody>
                    </Table>
                </Paper>
                <div>
                    <h3>This is the props stringify</h3>
                            <pre>{JSON.stringify(this.props.reduxState.currentCountries [null, 2])}</pre>
                </div>
            </>
        )
    }
} // End CountryDisplay component

// Provides reduxState to component through props
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(CountryDisplay)
// stores all data from event table in database
const currentCountries = (state = [], action) => {
    switch (action.type) {
        case 'SET_COUNTRIES':
            return action.payload;
        default:
            return state;
    }
}

export default currentCountries;
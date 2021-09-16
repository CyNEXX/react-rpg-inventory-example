const tableMetaData = (state, action) => {
/*     console.log('tableMetaData', state, action);
 */    switch (action.type) {
        case 'POPULATE_TABLEMETADATA': {
            return action.value;
        };
        default: return state;
    }
}

export { tableMetaData as default }
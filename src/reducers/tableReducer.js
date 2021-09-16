const tableReducer = (state, action) => {
/*     console.log('tableReducer', state, action);
 */    switch (action.type) {
        case 'POPULATE_TABLE': {
            return action.value;
        }
        case 'POPULATE_TABLE_MAP': {
            return action.value;
        }
        case 'CLEAR_TABLE': {
            return state.tableData.filter((item) => {return false});
        }
        default: return state;
    }
}

export { tableReducer as default }
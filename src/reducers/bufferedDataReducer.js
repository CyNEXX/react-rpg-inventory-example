const bufferedDataReducer = (state, action) => {/* 
    console.log('bufferedDataReducer ', state, action); */
    switch (action.type) {
        case 'SET_BUFFERED_ITEM': return { ...state, bufferedItem: action.value };
        case 'CLEAR_BUFFERED_ITEM': return { ...state, bufferedItem: null };
        case 'SET_CURSOR_HOVER': return { ...state, cursorHover: action.value };
        case 'SET_SWAPPABLE': return { ...state, swappable: action.value };
        case 'SET_FOUND_PLACEMENT': return { ...state, foundPlacement: action.value };
        case 'SET_TRACKING': return { ...state, tracking: action.value }
        case 'SET_VISITING_INVENTORY': return { ...state, visiting: action.value }
        case 'SET_SHOW_DATALAYER': return { ...state, showDataLayer: action.value };
        default: return state;
    }
};

export { bufferedDataReducer as default }
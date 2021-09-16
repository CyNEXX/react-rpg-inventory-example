const toolsReducer = (state, action) => {
/*     console.log('toolsReducer: ', state, action); */
    switch (action.type) {
        case 'POPULATE_TOOLS': {
            return { ...state, itemOptions: action.value };
        }
        default: return state;
    }
};

export { toolsReducer as default }
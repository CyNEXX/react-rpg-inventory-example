const itemsReducer = (state, action) => {
/*     console.log('itemsReducer', state, action);
 */    switch (action.type) {
        case 'POPULATE_ITEMS': {
            return action.value;
        }
        case 'ADD_ITEM': {
            return [...state, action.value];
        }
        case 'CLEAR_ITEMS': {
            return state.filter((item) => false);
        };
        case 'REMOVE_ITEM': {
            return state.filter(item => item.itemID !== action.value);
        }
        case 'SAVE_ITEM': {
            return state.items.map((item) => {
                if (item.itemID === action.value) { return { ...item, ...action.updates } }
                return item;
            });
        };
        default: return state;
    }
}

export { itemsReducer as default }
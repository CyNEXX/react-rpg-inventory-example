import React, { createContext, useContext, useReducer } from "react";
import combineReducer from "./combineReducer";
import bufferedDataReducer from "../reducers/bufferedDataReducer";
import itemsReducer from '../reducers/itemsReducer';
import tableReducer from '../reducers/tableReducer';
import tableMetaDataReducer from "../reducers/tableMetaDataReducer";
import toolsReducer from "../reducers/toolsReducer";

const AppContext = createContext();

const Context = props => {
    if (props === undefined)
        throw new Error(
            "Props Undefined. You probably mixed up betweenn default/named import"
        );
    const { load, ...rest } = props;
    const [state, dispatch] = useReducer(load.reducer, load.state);


    return <AppContext.Provider value={{ state, dispatch }} {...rest} />;
};

const useStore = () => useContext(AppContext);

const createStore = (reducer, state) => ({ reducer, state });

const initStore = () => {
    const state = {
        bufferedData: {
            bufferedItem: null,
            cursorHover: false,
            cursorPosition: { x: 0, y: 0 },
            swappable: null,
            foundPlacement : null,
            tracking: false,
            visiting: false,
            showDataLayer: false
        },
        items: [],
        tableData: [],
        tableMetaData: {
            columns: 10,
            rows: 6
        },
        tools: {
            itemOptions: []
        }
    };
    const reducer = combineReducer({
        bufferedData: bufferedDataReducer,
        items: itemsReducer,
        tableData: tableReducer,
        tableMetaData: tableMetaDataReducer,
        tools: toolsReducer
    });

    const load = createStore(reducer, state);/* 
    console.log('Context | Creating store / load', load); */
    return load;
};

export { initStore, useStore, Context as default }
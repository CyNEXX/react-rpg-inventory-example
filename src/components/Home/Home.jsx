import React, { useEffect } from 'react';
import Inventory from '../Inventory/Inventory';
import Tools from '../Tools/Tools';
import { useStore } from '../../context/Context';
import initialItems from '../../fixtures/items';
import FloatingWindow from '../FloatingWindow/FloatingWindow';
import useMouseClick from '../../hooks/useMouseClick';

const Home = () => {
    const { state, dispatch } = useStore();

    const clearSelection = () => {
        dispatch({ type: 'CLEAR_BUFFERED_ITEM' });
        dispatch({ type: 'SET_FOUND_PLACEMENT', value: false });
        dispatch({ type: 'SET_CURSOR_HOVER', value: false });
    }

    useMouseClick(clearSelection);

    const saveToLocalStorage = (obj, objName) => {
        localStorage.setItem(objName, JSON.stringify(obj))
    };

    const loadFromLocalStorage = (objName) => {
        const result = JSON.parse(localStorage.getItem(objName));
        return result;
    };

    useEffect(() => {
        let items = loadFromLocalStorage('items');

        if (items && items.length) {
            dispatch({
                type: 'POPULATE_ITEMS', value: items
            });

        } else {
            dispatch({
                type: 'POPULATE_ITEMS', value: initialItems
            });
            saveToLocalStorage(initialItems, 'items');
            dispatch({
                type: 'POPULATE_TOOLS', value: tools
            });
        }

        let tools = items.filter((item, index) => {
            if (index > 3) return false;
            return true;
        });
        dispatch({
            type: 'POPULATE_TOOLS', value: tools
        });

    }, []);

    return (<div className='main-container d-flex '>
        <Tools />
        <Inventory />
        <FloatingWindow />
    </div>)
}

export { Home as default }
import React from 'react';
import { useStore } from "../../context/Context";

import { updateBufferedItem, createBufferedItem, arrangeItems, checkAvailableArea } from '../../operations/itemsOperations';



const Tools = () => {
    const { state, dispatch } = useStore();
    const { items, tools, tableMetaData } = state;
    const maxRows = tableMetaData.rows;
    const maxColumns = tableMetaData.columns;


    const setStyle = (item) => {
        return {
            'width': `${item.size.width * 50}px`,
            'height': `${item.size.height * 50}px`
        }
    }

    const getState = (e) => {
        /*       console.log('State ', state); */
    }

    const onItemClick = (itemID) => {
        const newBufferedItem = createBufferedItem(getItemByID(itemID));
        newBufferedItem.itemID = Date.now();
        dispatch({ type: 'SET_BUFFERED_ITEM', value: newBufferedItem });
        dispatch({ type: 'SET_CURSOR_HOVER', value: true });
    };

    const getItemByID = (itemID) => {
        return tools.itemOptions.filter((item) => { return item.itemID === itemID })[0]
    }

    const onPickUp = (itemID) => {
        let newBufferedItem = createBufferedItem(getItemByID(itemID));
        let isRoomForItem = false;

        MAIN_LOOP:
        for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
            for (let colIndex = 0; colIndex < maxColumns; colIndex++) {
                if (newBufferedItem.size.width + colIndex > maxColumns || newBufferedItem.size.height + rowIndex > maxRows) { continue; }
                isRoomForItem = checkAvailableArea(items, colIndex, rowIndex, colIndex + newBufferedItem.size.width, rowIndex + newBufferedItem.size.height, maxColumns, maxRows);
                if (isRoomForItem) {
                    newBufferedItem = updateBufferedItem(newBufferedItem, colIndex, rowIndex);
                    dispatch({ type: 'ADD_ITEM', value: newBufferedItem });
                    break MAIN_LOOP;
                }
            }
        }
    }

    const clickArrangeItems = (e) => {
        dispatch({ type: 'POPULATE_ITEMS', value: arrangeItems(items, maxRows, maxColumns) });
    }

    const clearInventory = () => {
        dispatch({ type: 'POPULATE_ITEMS', value: [] });
    };

    const resetInventory = () => {
        let items = JSON.parse(localStorage.getItem('items'));
        dispatch({ type: 'POPULATE_ITEMS', value: items });
    };

    return (
        <div className='sidebar d-flex flex-column custom-border'>
            <h1>Simulate</h1>
            <div>
                <h5>Quick add</h5>
                <div className='d-flex flex-wrap align-items-start flex-row'>
                    {tools.itemOptions.map((item, index) => {
                        return <button
                            className={`cell item ${item.css} tools-item-button`}
                            title="Pick this item from ground"
                            itemID={item.itemID}
                            key={index}
                            style={setStyle(item)}
                            onClick={(e) => {
                                e.preventDefault();
                                onPickUp(item.itemID);
                            }}>
                        </button>
                    })}
                </div>
                <h5>Place item</h5>
                <div className='d-flex flex-wrap align-items-start flex-row'>
                    {tools.itemOptions.map((item, index) => {
                        return <button
                            className={`cell item ${item.css} tools-item-button`}
                            title="Pick this item and place it"
                            itemID={item.itemID}
                            style={setStyle(item)}
                            key={index}
                            onClick={(e) => {
                                onItemClick(item.itemID);
                            }}>
                        </button>
                    })}
                </div>
                <h5>Drop item everywhere else</h5>
                <h6 className='text-muted'>and forget about it</h6>

            </div>
            <div className='d-flex w-100 mt-auto mb-4 d-flex flex-column'>
                <div>
                    <button
                        className='cell col-12 cell-empty'
                        onClick={(e) => {
                            clickArrangeItems();
                        }}>Arrange</button>
                </div>
                <div>
                    <button className='cell col-12 cell-empty'
                        onClick={(e) => {
                            resetInventory();
                        }}>Reset</button>
                </div>
                <div>
                    <button className='cell col-12 cell-empty'
                        onClick={(e) => {
                            clearInventory();
                        }}>Clear</button>
                </div>
                {false &&
                    <div className='d-flex justify-content-around'>
                        <button
                            className='cell col-6 cell-empty'
                            onClick={(e) => {
                                clickArrangeItems();
                            }}>
                            A
                        </button>
                        <button
                            className='cell col-6 cell-empty'
                            disabled
                            onClick={(e) => {
                                e.preventDefault();
                                getState();
                            }}>
                            S
                        </button>
                    </div>}

            </div>
        </div>
    )
}


export { Tools as default }
import React, { useState, useEffect } from "react";
/* import initialItems from '../../fixtures/items'; */
import { useStore } from "../../context/Context";
import Tools from '../Tools/Tools';
import cellimg from '../../assets/cell.jpg';
import puzzle_ring from '../../assets/puzzle_ring.jpg';
import bovine_bardiche from '../../assets/bovine_bardiche.jpg';
import talrasha_pursuit from '../../assets/talrasha_pursuit.jpg';
import the_oculus from '../../assets/the_oculus.jpg';
import inventoryAreaBg from '../../assets/desert-sand-texture.jpg'
import { act } from "react-dom/test-utils";
import { createTableData, getEmptyCellDiv, isSameCell } from '../../operations/tableOperations';
import { checkEmptyArea, createBufferedItem, updateBufferedItem, compareItems, checkAvailableArea } from '../../operations/itemsOperations';
import GridLayer from "../GridLayer/GridLayer";


const Inventory = () => {

    const { state, dispatch } = useStore();
    const [spaceAvailability, setSpaceAvailability] = useState('');
    let tableData = state.tableData;
    let actualItems = state.items;

    const maxColumns = state.tableMetaData.columns;
    const maxRows = state.tableMetaData.rows;
    const { cursorHover, bufferedItem, swappable, foundPlacement, showDataLayer } = state.bufferedData;


    const [justVisitedCell, setJustVisitedCell] = useState({});

    const onCellClick = (colData) => {
/*         console.log(`R > ${colData.yRow} | C > ${colData.xCol}`);
        if (colData.itemID) {
            console.log('└-> I', getItemByID(actualItems, colData.itemID));
        } */
        const clonedBufferedItem = createBufferedItem(bufferedItem);
        const clickedItem = createBufferedItem(getItemByID(actualItems, colData.itemID));

        if (foundPlacement || !clonedBufferedItem) {
            swapItems(clickedItem, clonedBufferedItem, colData.xCol, colData.yRow);
            dispatch({ type: 'SET_CURSOR_HOVER', value: true });
        }
    };

    const placeItem = (item, xCol, yRow) => {
        item = updateBufferedItem(item, xCol, yRow);
        dispatch({ type: 'ADD_ITEM', value: item });
        dispatch({ type: 'CLEAR_BUFFERED_ITEM' });
        dispatch({ type: 'SET_FOUND_PLACEMENT', value: false });
    };

    const swapItems = (clickedItem, savedItem, xCol, yRow) => {
        if (!clickedItem && !savedItem) { return; }
        else if (!savedItem) { pickItem(clickedItem); }
        else if (!clickedItem) { placeItem(savedItem, xCol, yRow); }
        else {
            savedItem = updateBufferedItem(savedItem, clickedItem.anchor.xCol, clickedItem.anchor.yRow, true);
            dispatch({ type: 'REMOVE_ITEM', value: clickedItem.itemID });
            dispatch({ type: 'ADD_ITEM', value: savedItem });
            dispatch({ type: 'SET_BUFFERED_ITEM', value: clickedItem });
        }

    };


    const pickItem = (item) => {
        dispatch({ type: 'SET_BUFFERED_ITEM', value: item });
        dispatch({ type: 'REMOVE_ITEM', value: item.itemID });
    };

    const getItemByID = (items, itemID) => {
        return items.filter((item) => { return item.itemID === itemID })[0];
    }

    useEffect(() => {
        let newData = createTableData(actualItems, maxColumns, maxRows);
        dispatch({ type: 'POPULATE_TABLE', value: newData });
    }, [actualItems]);



    const handleMouseOver = (e, columnData) => {
        if (cursorHover && columnData) {
            const sameCell = isSameCell(columnData, justVisitedCell);
            if (!sameCell) {
                setJustVisitedCell(columnData);
                if (!bufferedItem) {
                    dispatch({ type: 'SET_FOUND_PLACEMENT', value: true });
                } else {
                    let result = checkAvailableArea(actualItems, columnData.xCol, columnData.yRow,
                        bufferedItem.size.width + columnData.xCol,
                        bufferedItem.size.height + columnData.yRow,
                        maxColumns, maxRows,
                        getItemByID(actualItems, columnData.itemID));

                    dispatch({ type: 'SET_FOUND_PLACEMENT', value: result });
                }
            }
        }
    };

    const handleTableEnter = (e) => { dispatch({ type: 'SET_VISITING_INVENTORY', value: true }); }
    const handleTableLeave = (e) => { dispatch({ type: 'SET_VISITING_INVENTORY', value: false }); }

    return (
        <div className='d-flex align-items-center flex-column w-100 h-100 align-self-center inventory-area centered-image position-relative'>
            <div className='tables-container m-auto'>
                {false && <GridLayer maxColumns={maxColumns} maxRows={maxRows} />}
                <table className='fixed m-auto item-layer-table'>
                    <thead>
                        <tr>
                            <th className={'cell cell-empty cell-empty-info'}
                                colSpan="10"><h4>Inventory</h4>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='fixed m-auto inventory-table'
                        onMouseEnter={(e) => {
                            handleTableEnter(e);
                        }}
                        onMouseLeave={(e) => {
                            handleTableLeave(e);
                        }}>
                        {tableData.map((row, rowIndex) => {
                            return <tr key={rowIndex}>
                                {row.map((col, colIndex) => {
                                    return <td key={`${col.yRow}-${col.xCol}`}
                                        colSpan={col.colspan ? col.colspan : undefined}
                                        rowSpan={col.rowspan ? col.rowspan : undefined}
                                        className={'cell'}
                                        onMouseOver={(e) => {
                                            handleMouseOver(e, col);
                                        }}
                                        onClick={(e) => {
                                                 onCellClick(col);
                                        }}>
                                        <div
                                            key={`${col.yRow}-${col.xCol}`}
                                            className={'celldiv' + ' ' + (col.isAnchor ? `item ${col.css}` : `cell-empty cell-empty-info ${spaceAvailability}`)}>
                                            {!col.isAnchor ? getEmptyCellDiv(col) : undefined}
                                            <div
                                                key={`${col.yRow}-${col.xCol}`}
                                                className={'cell-info-panel centered-image' + ' ' + (col.isAnchor ? `item ${col.css}` : `cell-empty cell-empty-info`)}
                                                itemID={col.itemID ? col.itemID : undefined}                                            >
                                            </div>
                                            <div className='cell-overlay-panel visiting-red'>
                                            </div>
                                        </div>
                                    </td>
                                })}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export { Inventory as default };

const arrangeItems = (items, totalRows, totalColumns) => {
    let sorted = items.sort(itemSorter).reverse();
    return rearrangeItems(sorted, totalRows, totalColumns);
};

const createBufferedItem = (item) => {
    if (!item || !item.itemID) return null;
    return JSON.parse(JSON.stringify(item));
}



const checkEmptyArea = (items, startingColIdx, startingRowIdx, maxColIndex, maxRowIndex, maxColumns, maxRows) => {
    if (maxColIndex > maxColumns || maxRowIndex > maxRows) return false;
    let tempRowIdx = startingRowIdx;
    for (tempRowIdx; tempRowIdx < maxRowIndex; tempRowIdx++) {
        let tempColIdx = startingColIdx;
        for (tempColIdx; tempColIdx < maxColIndex; tempColIdx++) {
            let result = checkEmptyCell(items, tempColIdx, tempRowIdx);
            if (result === false) return false;
        }
    }
    return true;
};


// new version
const checkAvailableArea = (items, startingColIdx, startingRowIdx, maxColIndex, maxRowIndex, maxColumns, maxRows, item) => {
    if (maxColIndex > maxColumns || maxRowIndex > maxRows) return false;
    let tempRowIdx = startingRowIdx;
    for (tempRowIdx; tempRowIdx < maxRowIndex; tempRowIdx++) {
        let tempColIdx = startingColIdx;
        for (tempColIdx; tempColIdx < maxColIndex; tempColIdx++) {
            let result = checkCellAvaiability(items, tempColIdx, tempRowIdx, item);
            if (result === false) return false;
        }
    }
    return true;
};

// new version
const checkCellAvaiability = (items, desiredColumn, desierdRow, item) => {
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        const currentItem = items[itemIndex];
        const currentAnchorColumn = currentItem.anchor.xCol;
        const currentAnchorRow = currentItem.anchor.yRow;
        const isSameItem = !!item && (item.itemID === currentItem.itemID);

        const isOccupied = ((desiredColumn >= currentAnchorColumn) && (desiredColumn < (currentAnchorColumn + currentItem.size.width))) &&
            (desierdRow >= currentAnchorRow && (desierdRow < (currentAnchorRow + currentItem.size.height)));

        if (isOccupied && isSameItem) return true;
        else if (isOccupied) return false;
    }
    return true;
};

const checkEmptyCell = (items, desiredColumn, desierdRow) => {
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        const currentItem = items[itemIndex];
        const currentAnchorColumn = currentItem.anchor.xCol;
        const currentAnchorRow = currentItem.anchor.yRow;

        const occupied = ((desiredColumn >= currentAnchorColumn) && (desiredColumn < (currentAnchorColumn + currentItem.size.width))) &&
            (desierdRow >= currentAnchorRow && (desierdRow < (currentAnchorRow + currentItem.size.height)));
        if (occupied) return false;
    }
    return true;
};

const compareItems = (item, nextItem) => {
    return (item.size.width > nextItem.size.width || item.size.height > nextItem.size.height) ? 1 :
        (item.size.width == nextItem.size.width && item.size.height == nextItem.size.height) ? 0 : -1;
};

const itemSorter = (item, nextItem) => {
    if (item.size.height == nextItem.size.height) {
        if (item.size.width === nextItem.size.width) return item.name.localeCompare(nextItem.name);
        return item.size.width - nextItem.size.width;
    }
    return item.size.height - nextItem.size.height;
};

const rearrangeItems = (items, totalRows, totalColumns) => {
    const sortedItems = [];
    const initialSize = items.length;
    let itemIndex = 0;
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
        COLUMN_LOOP:
        for (let colIndex = 0; colIndex < totalColumns; colIndex++) {
            for (itemIndex; itemIndex < items.length; itemIndex++) {
                let currentItem = items[itemIndex];
                if (itemIndex === 0) {
                    currentItem.anchor.yRow = 0;
                    currentItem.anchor.xCol = 0;
                    sortedItems.push(currentItem);
                    itemIndex++;
                    continue COLUMN_LOOP;
                } else {
                    for (let resultIndex = 0; resultIndex < sortedItems.length; resultIndex++) {
                        let resultItem = sortedItems[resultIndex];
                        if (
                            (rowIndex <= resultItem.anchor.yRow + resultItem.size.height - 1 && rowIndex >= resultItem.anchor.yRow) &&
                            (colIndex <= resultItem.anchor.xCol + resultItem.size.width - 1 && colIndex >= resultItem.anchor.xCol) ||
                            (resultItem.anchor.yRow + resultItem.size.height - 1 > totalRows - 1 || resultItem.anchor.xCol + resultItem.size.width - 1 > totalColumns - 1)
                        ) {
                            continue COLUMN_LOOP;
                        }
                    }
                    currentItem.anchor.yRow = rowIndex;
                    currentItem.anchor.xCol = colIndex;
                    sortedItems.push(currentItem);
                }

            }
        }
    }
    return sortedItems /* sortedItems.length === initialSize ? sortedItems : items */;
}

const updateBufferedItem = (item, xCol, yRow, onlyCoordonates) => {
    item.anchor.xCol = xCol;
    item.anchor.yRow = yRow;
    if (!onlyCoordonates) {
        item.itemID = Date.now();
    }
    return item;
}


export { checkEmptyArea, updateBufferedItem, createBufferedItem, arrangeItems, compareItems, checkAvailableArea };
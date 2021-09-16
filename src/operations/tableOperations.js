
const createCellData = (xCol, yRow, item) => {
    if (item && !(yRow === item.anchor.yRow && item.anchor.xCol === xCol)) { return null; }
    let resultCellData = {
        yRow,
        xCol
    };
    if (item) {
        resultCellData.itemID = item.itemID ? item.itemID : new Date();
        resultCellData.rowspan = item.size.height > 1 ? item.size.height : undefined;
        resultCellData.colspan = item.size.width > 1 ? item.size.width : undefined;
        resultCellData.message = item.name;
        resultCellData.isAnchor = yRow === item.anchor.yRow && item.anchor.xCol === xCol;
        resultCellData.css = item.css;
    }

    return resultCellData;
};

// experimental
// row-column : columnData
const createGridLayer = (items, maxColumns, maxRows) => {
    const result = new Map();
    for (let ri = 0; ri < maxRows; ri++) {
        for (let ci = 0; ci < maxColumns; ci++) {
            if (items.length == 0) {
                result.set(createMapEntry(ci, ri));
            } else {
                let item = getObjectFromCell(items, ci, ri);
                let tempCellData = createMapEntry(ci, ri, item);
                result.set(`${ri}-${ci}`, tempCellData);
            }
        }
    }
    return result;
};

const createTableData = (items, maxColumns, maxRows) => {
    const result = [];
    for (let rowIdx = 0; rowIdx < maxRows; rowIdx++) {
        const rowData = [];
        for (let colIdx = 0; colIdx < maxColumns; colIdx++) {

            if (items.length == 0) {
                rowData.push(createCellData(colIdx, rowIdx));
            } else {
                let item = getObjectFromCell(items, colIdx, rowIdx);
                if (item) {
                }
                let tempCellData = createCellData(colIdx, rowIdx, item);

                if (tempCellData != null) {
                    rowData.push(tempCellData);
                }


            }
        }
        result.push(rowData);
    }
    return result;

};



const createMapEntry = (xCol, yRow, item) => {
    let resultCellData = {
        yRow,
        xCol
    };
    if (item && !(yRow === item.anchor.yRow && item.anchor.xCol === xCol)) {
        resultCellData.proxy = true;
        resultCellData.itemID = item.itemID ? item.itemID : new Date();
        resultCellData.css = item.css;
        return resultCellData;
    }
    if (item) {
        resultCellData.itemID = item.itemID ? item.itemID : new Date();
        resultCellData.rowspan = item.size.height > 1 ? item.size.height : undefined;
        resultCellData.colspan = item.size.width > 1 ? item.size.width : undefined;
        resultCellData.message = item.name;
        resultCellData.isAnchor = yRow === item.anchor.yRow && item.anchor.xCol === xCol;
        resultCellData.css = item.css;
    }

    return resultCellData;
};


// new version
const getObjectFromCell = (items, xCol, yRow) => {
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        let item = items[itemIndex];
        if (
            (yRow >= item.anchor.yRow && yRow < item.anchor.yRow + item.size.height) &&
            (xCol >= item.anchor.xCol && xCol < item.anchor.xCol + item.size.width)
        ) {
            return item;
        }
    }
    return null;
};

const getEmptyCellDiv = ({ xCol, yRow }) => {
    return <div className='empty-cell-div'><span>{yRow + ' ' + xCol}</span></div>
}

const isSameCell = (cell, otherCell) => {
    const cellYRow = cell.anchor ? cell.anchor.yRow : cell.yRow;
    const cellXCol = cell.anchor ? cell.anchor.xCol : cell.xCol;
    const otherCellYRow = otherCell.anchor ? otherCell.anchor.yRow : otherCell.yRow;
    const otherCellXCol = otherCell.anchor ? otherCell.anchor.xCol : otherCell.xCol;
    return cellYRow === otherCellYRow && cellXCol === otherCellXCol;
}

export { createTableData, createCellData, getEmptyCellDiv, isSameCell/* , createMapData */ }
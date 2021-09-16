import React, { useState, useEffect } from "react";

const GridCell = ({ col, row }) => {

    const [highlighted, setHighlighted] = useState(false);

    const handleOnClick = (e) => {
      /*   console.log(`Clicked grid cell r ${row} c ${col}`); */
    };

    const handleMouseUp = (e, xCol, yRow) => {
        /*      e.preventDefault(); */
  /*       console.log('UP here');
        console.log(col, row); */
    }

    const handleMouseDown = (e, col, row) => {
       /*  console.log(`DOWN Clicked grid cell r ${row} c ${col}`); */
    }

    const handleMouseOver = (e) => {
/*         console.log(`hover`); */
    }
    return (<td
        onMouseOver={(e) => {
            handleMouseOver(e, col);
        }}
        onClick={handleOnClick}
        className={`cell-grid ${highlighted ? 'highlighted' : ''}`}></td>)
};

export { GridCell as default }
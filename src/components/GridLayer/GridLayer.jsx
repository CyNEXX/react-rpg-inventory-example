import GridCell from "../GridCell/GridCell";
import React from "react";
import { useStore } from "../../context/Context";


const GridLayer = ({ maxColumns, maxRows }) => {

    const { state } = useStore();


    return (<>{
        <table className='grid-layer-table m-auto'>
            <thead className='grid-layer-thead'>
                <tr><th></th></tr>
            </thead>
            <tbody className='grid-layer-tbody position-relative'>
                {[...Array(maxRows).keys()].map((row, rowIndex) => {
                    return (<tr key={rowIndex}>
                        {[...Array(maxColumns).keys()].map((column, colIndex) => {
                            return <GridCell key={colIndex} col={colIndex} row={rowIndex}></GridCell>
                        })}
                    </tr>)
                })}
            </tbody>
        </table>}
    </>)
};

export { GridLayer as default }
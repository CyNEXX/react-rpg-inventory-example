/* import React, { useEffect, useState } from 'react'; */
import { useStore } from "../../context/Context";
import useMousePosition from '../../hooks/useMousePosition';


const FloatingWindow = () => {
    const { state, dispatch } = useStore();
    const { cursorHover, bufferedItem, foundPlacement, visiting } = state.bufferedData;
    const { x, y } = useMousePosition();

    /*     const [style, setStyle] = useState({}); */

    const setCoordinates = (x, y) => {
        return {
            'position': `absolute`,
            'left': `${x}px`,
            'top': `${y}px`,
            'width': `${bufferedItem.size.width * 50}px`,
            'height': `${bufferedItem.size.height * 50}px`,
        }
    }

    return (<>
        {cursorHover && bufferedItem &&
            <div
                className={`${!cursorHover ? 'd-none' : 'custom-border centered-image ' + bufferedItem.css + ' d-flex'} floating-window custom-border ${visiting && foundPlacement === false ? 'unavailable-space' : 'available-space'}`}
                style={bufferedItem && setCoordinates(x, y)}>

            </div>}
    </>)
};

export { FloatingWindow as default }



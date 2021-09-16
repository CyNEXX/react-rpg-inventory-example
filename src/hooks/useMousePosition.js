import { useState, useEffect } from "react";
import { useStore } from "../context/Context";

const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { state, dispatch } = useStore();
    const tracking = state.bufferedData.tracking;


    useEffect(() => {
        const handleMouseMove = (e) => {
            /* console.log('goes ', tracking); */
            setPosition({
                x: e.pageX,
                y: e.pageY
            });
        }
        document.addEventListener('mousemove', handleMouseMove);
        /* if (!tracking) document.removeEventListener('mousemove', handleMouseMove); */
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    return position;
};

export { useMousePosition as default }
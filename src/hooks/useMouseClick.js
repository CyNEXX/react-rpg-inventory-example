import { useState, useEffect } from "react";
import { useStore } from "../context/Context";

const useMouseClick = (func) => {
   /*  const [position, setPosition] = useState({ x: 0, y: 0 }); */
    const { state, dispatch } = useStore();
    const { visiting } = state.bufferedData;


    useEffect(() => {
        const handleMouseClick = (e) => {
            if (!visiting) {
                func();
            }
        };
        document.addEventListener('mousedown', handleMouseClick);
        /* if (!tracking) {document.removeEventListener('mousedown', handleMouseClick);} */
        return () => {
            document.removeEventListener('mousedown', handleMouseClick);
        }
    }, [visiting]);
};

export { useMouseClick as default };
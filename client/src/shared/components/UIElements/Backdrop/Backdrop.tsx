import React from "react";
import './Backdrop.css';

import { createPortal } from "react-dom";

const Backdrop = ({onClick}) =>{
    return createPortal(
        <div className="backdrop" onClick={onClick}></div>,
        document.getElementById('backdrop-hook')
    )
}

export default Backdrop;
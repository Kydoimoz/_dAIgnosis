import React, { useEffect } from "react";
import classes from "./MenuIcon.module.css";
import { useState } from "react";
export default function MenuIcon() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${classes.navbar} ${isOpen ? classes.open : ""}`}
            onClick={handleClick}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

import { React } from "react";
import classes from "./TypingIndicator.module.css";
export default function TypingIndicator() {
    return (
        <div className={classes.container}>
            <span>dAIgnosis™ is typing </span>
            <div className={classes.block}>
                <div className={classes.dot}>

                </div>
                <div className={classes.dot}>

                </div>
                <div className={classes.dot}>
                </div>
            </div>
        </div>
    );
}
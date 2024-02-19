import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import classes from "./ChatHomePage.module.css";
export default function ChatHomePage() {
    const notficationCount = 1;
    const [isSliderVisible, setIsSliderVisible] = useState(false);
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        setIsOnline(navigator.onLine);

        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);

        return () => {
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline', handleOnlineStatus);
        };
    }, []);

    const handleOnlineStatus = () => {
        setIsOnline(navigator.onLine);
    };

    const toggleSlider = () => {
        setIsSliderVisible(prevState => !prevState);
    };

    return (
        <div className={classes.container}>
            <div className={classes.notification} onClick={toggleSlider}>
                <span className={classes.count}>
                    {notficationCount}
                </span>
            </div>
            <div className={`${classes.slider} ${isSliderVisible ? classes.sliderVisible : classes.slidernotvisible}`}>
                <div className={classes.content}>
                    <div className={classes.name}>
                        <span>dAIgnosis - AI ChatBot</span>
                        <div className={classes.active}>
                            Status: {isOnline ? "Online" : "Offline"}
                        </div>
                    </div>
                    <div className={classes.chatarea}>
                        Hello, avid visitor!
                    </div>
                    <div className={classes.response}>
                        Hello, I need you to diagnose me based on the symptoms I have!
                    </div>
                    <div className={classes.chatarea}>
                        Hello, avid visitor!
                    </div>
                </div>
            </div>
        </div>

    );
}
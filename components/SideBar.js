import Image from "next/image";
import Link from "next/link";
import { React } from "react";
import { useRouter } from "next/router";
import styles from "./SideBar.module.css";
import { useEffect } from 'react';
import activateLinks from '../utils/navigation';
import { Montserrat } from "next/font/google";
import { useState } from "react";
import MenuIcon from "./MenuIcon";
const montserrat = Montserrat({ subsets: ["latin"], weight: "600" });
export default function SideBar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [clickedIndex, setClickedIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const handleItemClick = (index) => {
        setActiveIndex(index);
        setClickedIndex(index);
    };

    const handleItemHover = (index) => {
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (clickedIndex !== null) {
            setActiveIndex(clickedIndex);
        }
    };
    const [isOpen, setIsOpen] = useState(false);
    const [containerWidth, setContainerWidth] = useState("85px");
    const [menuPosition, setMenuPosition] = useState("0")
    const [moveProfile, setMoveProfile] = useState("0");
    const [fade, setFade] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        setContainerWidth(isOpen === true ? "85px" : "300px");
        setMenuPosition(isOpen ? "0" : "8vw");
        setFade(!isOpen === true ? styles.fadeClass : "");
    };
    useEffect(() => {
        setMoveProfile(isOpen ? "100%" : "0");
    }, [isOpen]);
    return (

        <div className={styles.container}>

            <div className={`${styles.navigation}`} style={{ width: containerWidth }}>
                <div className={`${styles.navbar} ${isOpen ? styles.open : ""}`}
                    style={{ position: "absolute", left: menuPosition }}
                    onClick={handleClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={styles.contentClass}>
                    <ul >
                        <li className={`${styles.list} ${activeIndex === 0 ? styles.active : ''} ${clickedIndex === 0 ? styles.clicked : ''}`} onClick={() => handleItemClick(0)} onMouseEnter={() => handleItemHover(0)} onMouseLeave={handleMouseLeave}>
                            <a href="/chat">
                                <span className={styles.icon}>

                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={45} height={45}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                    </svg>


                                </span>
                                <span className={`${styles.title} ${montserrat.className}`}>CHAT</span>
                            </a>
                        </li>
                        <li className={`${styles.list} ${activeIndex === 1 ? styles.active : ''} ${clickedIndex === 1 ? styles.clicked : ''}`} onClick={() => handleItemClick(1)} onMouseEnter={() => handleItemHover(1)} onMouseLeave={handleMouseLeave}>
                            <a href="#">
                                <span className={styles.icon}>
                                    <svg width={45} height={45} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </span>
                                <span className={`${styles.title} ${montserrat.className}`}>HOME</span>
                            </a>
                        </li>

                        <li className={`${styles.list} ${activeIndex === 2 ? styles.active : ''} ${clickedIndex === 3 ? styles.clicked : ''}`} onClick={() => handleItemClick(2)} onMouseEnter={() => handleItemHover(2)} onMouseLeave={handleMouseLeave}>
                            <a href="#">
                                <span className={styles.icon}>
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={45} height={45}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                </span>
                                <span className={`${styles.title} ${montserrat.className}`}>PROFILE</span>
                            </a>
                        </li>

                        <li className={`${styles.list} ${activeIndex === 3 ? styles.active : ''} ${clickedIndex === 3 ? styles.clicked : ''}`} onClick={() => handleItemClick(3)} onMouseEnter={() => handleItemHover(3)} onMouseLeave={handleMouseLeave}>
                            <a href="#">
                                <span className={styles.icon}>
                                    <svg width={45} height={45} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                    </svg>

                                </span>
                                <span className={`${styles.title} ${montserrat.className}`}>SIGN OUT</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.profile} style={{ width: moveProfile, position: "absolute", bottom: "0" }}>
                    <div className={styles.flexcontainer}>
                        <div className={styles.flexprofile}>
                            <Image src="/images/random.jpg" width={44} height={44} style={{ borderRadius: "66px", marginLeft: "-25%", display: "flex", alignItems: "baseline", marginTop: "10%" }} />
                            <label className={styles.info} for="text-align">
                                <span className={styles.spanText}>Max Mustermann</span>
                                <span>Patient</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}
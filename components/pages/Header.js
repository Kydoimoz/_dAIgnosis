import React from "react";
import classes from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSpring, animated } from 'react-spring';
import { useState } from "react";
import SelectDropDown from "./functionals/SelectAccount";
import { useRouter } from "next/navigation";
export default function Header() {

    const [isOpen, setIsOpen] = useState(false);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const router = useRouter();
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <Image onClick={() => router.push("/")} src="/images/daignosis_logosvgimg.svg" width={330} height={111} />
                </div>
                <div className={classes.navbar}>
                    <div className={classes.medics}>
                        <Link className={classes.medics_link} href="/medics">Medication</Link>
                    </div>
                    <div className={classes.btn} onClick={toggleDropdown}>
                        <SelectDropDown />
                    </div>

                </div>
            </div>
        </div>
    );
}
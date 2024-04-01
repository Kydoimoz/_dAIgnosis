import React from "react";
import classes from "./Footer.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Footer() {
    const router = useRouter();
    const handleSignOut = () => {
        //use nextauthentication
        router.push("/");
    }
    return (
        <footer className={classes.footer}>
            <div className={classes.content}>
                <div className={classes.credits}>
                    Copyright © 2024 - dAIgnosis ™ | All Rights Reserved ®
                    <div className={classes.log_info}>
                        <span className={classes.text}>Logged In as Max Mustermann <span className={classes.signout} onClick={handleSignOut}>(Sign Out)</span></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
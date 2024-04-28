import React from "react";
import classes from "./Footer.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
export default function Footer() {
    const router = useRouter();
    const { data: session } = useSession({ required: false });
    const signedIn = session?.user;
    const handleSignOut = async() => {
        await signOut();
        router.push("/");
    }
    return (

        <footer className={classes.footer}>
        {signedIn ? (
            <div className={classes.content}>
            <div className={classes.credits}>
                Copyright © 2024 - dAIgnosis ™ | All Rights Reserved ®
                <div className={classes.log_info}>
                    <span className={classes.text}>Logged In as {session?.user?.firstName + " " + session?.user?.surname} <span className={classes.signout} onClick={handleSignOut}>(Sign Out)</span></span>
                </div>
            </div>
        </div>
        ) : (
            <>
                 <div className={classes.content}>
            <div className={classes.credits}>
                Copyright © 2024 - dAIgnosis ™ | All Rights Reserved ®
                <div className={classes.log_info}>
                    <span className={classes.text}>Sign Up to access additional features <span className={classes.signout} onClick={handleSignOut}>(Sign Out)</span></span>
                </div>
            </div>
        </div>
            </>
        )}
        </footer>
    );
}
import React from "react";
import classes from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSpring, animated } from 'react-spring';
import { useState } from "react";
import SelectDropDown from "./functionals/SelectAccount";
import { useRouter } from "next/navigation";
import { signOut, useSession, signIn } from "next-auth/react";
import { Righteous } from "next/font/google";
const righteous = Righteous({subsets: ["latin"], weight: "400"});
export default function Header() {

    const [isOpen, setIsOpen] = useState(false);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleSignOut = async () => {
        try {

            await signOut();
            router.push("/")
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };
    const { data: session } = useSession();
    const signedIn = session?.user;
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
                    {signedIn ? (


<>
<div className={`${classes.signout_btn} ${righteous.className}`} onClick={() => handleSignOut()}>Sign Out</div>
</>
                    ) : (
                        <div className={`${classes.sign_field}`}>
                        <div className={`${classes.signin_btn} ${righteous.className}`} onClick={() => signIn()}>Sign in</div>
                        <span className={`${classes.or_seperator} ${righteous.className}`}>or</span>
                        <div className={`${classes.signup_btn} ${righteous.className}`} onClick={() => router.replace("/signup")}>Sign up</div>
                    </div>
                    )}

                </div>
            </div>
        </div>
    );
}
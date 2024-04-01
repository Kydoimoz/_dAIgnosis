import { React } from "react";
import classes from "./SignUpForm.module.css";
import Image from "next/image";
export default function SignUpForm() {
    return (
        <div className={classes.main}>
            <div className={classes.background}>
                <Image onClick={() => router.push("/")} style={{ position: "absolute", left: "1%", top: "1%" }} src="/images/daignosis_logosvgimg.svg" width={330} height={111} />
                <div className={classes.content}>
                    <h1 className={classes.main_heading}>Welcome to <span>dAIgnosis™!</span></h1>
                    <h2>Chat and diagnose under our guidance!</h2>
                    <h1>Log in to access more features!</h1>
                </div>
            </div>
            <div className={classes.info_container}>
                <section className={classes.signup_section}>
                    <h1>Sign Up Now!</h1>
                </section>
            </div>
        </div>
    );
}
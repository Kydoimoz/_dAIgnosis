"use client";
import React, { useState } from "react";
import classes from "./LoginForm.module.css";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: "900" });
const lightMontserrat = Montserrat({ subsets: ["latin"], weight: "600" });

export default function LoginForm() {
    const router = useRouter();

    const [state, setState] = useState({
        password: "",
        email: "",
    });
    console.log(state.email);
    console.log(state.password);
    const [error_message, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const res =  await signIn("credentials", {
               password: state.password,
               email: state.email,
            
                redirect: false
            });
            console.log(res);
            if (res.error) {
                setErrorMessage("Invalid Credentials");
                return;
            }
            router.replace("/");
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangePassword = (e) => {
        const { value } = e.target;
        setState((prevState) => ({
            ...prevState,
            password: value
        }));
    };
    
    const handleChangeEmail = (e) => {
        const { value } = e.target;
        setState((prevState) => ({
            ...prevState,
            email: value
        }));
    };
    return (
        <div className={classes.main}>
            <div className={classes.background}>
                <Image onClick={() => router.push("/")} style={{ position: "absolute", left: "1%", top: "1%" }} src="/images/daignosis_logosvgimg.svg" width={330} height={111} />
                <div className={classes.content}>
                    <h1 className={`${classes.main_heading} ${montserrat.className}`}>Welcome to <span className={`${montserrat.className} ${classes.span_heading}`}>dAIgnosis™!</span></h1>
                    <Image aria-disabled="true" style={{position: "relative", left: "60%", right: "50%", transform: "translateX(-50%)"}} draggable="false" src="/images/daignosis_logo_signup.png" width={150} height={150}/>
                    <h2 className={`${montserrat.className} ${classes.desc}`}>Chat and diagnose under our <br/> guidance!</h2>
                    <h1 className={`${montserrat.className} ${classes.log_in}`}>Log in to access more features!</h1>
                </div>
            </div>
            <div className={classes.info_container}>
                <section className={classes.signup_section}>
                    <h1 className={`${montserrat.className} ${classes.section_heading}`}>Log in</h1>
                    <form onSubmit={handleSubmit} className={`${classes.below_content}`}>
                        <div className={classes.input_container}>
                            <input
                                className={`${lightMontserrat.className} ${classes.submit_input}`}
                                type="email"
                                aria-autocomplete="none"
                                name="email"
                                placeholder="Email"
                                value={state.email}
                                onChange={handleChangeEmail}
                                maxLength={22}
                                required
                            />
                        </div>
                        <div>
                            <input
                                className={`${lightMontserrat.className} ${classes.submit_input}`}
                                type="password"
                               name="email"
                                placeholder="Password"
                                value={state.password}
                                onChange={handleChangePassword}
                                minLength={6}
                                required
                            />
                        </div>
                        <br/>
                        <div className={classes.error}>{error_message}</div>
                        <button className={`${classes.btn} ${montserrat.className}`} type='submit' onClick={handleSubmit}>Log in</button>
                    </form>
                    <div className={`${classes.existingacc} ${montserrat.className}` }>Don't have an account? <Link href={"/signup"}><span className={classes.underline}>Sign up</span></Link></div>
                </section>
            </div>
        </div>
    );
}
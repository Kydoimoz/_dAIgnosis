"use client";
import { React, useState, useEffect } from "react";
import classes from "./SignUpForm.module.css";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import { useRouter } from "next/router";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextResponse } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";

 const montserrat = Montserrat({subsets: ["latin"], weight: "900"});
 const lightMontserrat = Montserrat({subsets: ["latin"], weight: "600"});

export default  function SignUpForm() {



    const [state, setState] = useState({
        firstName: "",
        surname: "",
        email: "",
        password: "",
        confirmpassword: "",
        role:"patient",
        newsletter: true,
    })
    useEffect(() => {
        console.log(state);
    });

    const [icon, setIcon] = useState(eyeOff);
    const [type, setType] = useState('password');

    const [visible, setVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();
    const { pathname, query } = router;


    console.log('Current Path:', pathname);
    console.log('Current Query Parameters:', query);

   
    const handleSendForm = async (e) => {
        e.preventDefault();
        const formData = {};
    
        Array.from(e.currentTarget.elements).forEach(element => {
            if (!element.name) return;
            formData[element.name] = element.value;
        });
    
        console.log('data-attributes:', formData);
    
        const keys = Object.keys(state);
        for (const key of keys) {
            if (state[key] === "") {
                setError("All fields are required!");
                return;
            }
        }
        try {
            const response = await fetch("/api/signup/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: state.firstName,
                    surname: state.surname,
                    email: state.email,
                    newsletter: state.newsletter,
                    password: state.password,
                    confirmpassword: state.confirmpassword
                }),
            });
    
            if (response.ok) {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const res = await response.json();
                    console.log(res);
                }
                else {
                    console.error('Error: Response is not JSON');
                }
                const form = e.target;
                form.reset();
                setSuccessMessage('User successfully created :)');
    
            }
            const logged = await fetch("/api/approve_login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email }),
                //  credentials: "include",
            });
            const { db_data } = await logged.json();
            console.log(db_data);
            if (db_data) {
                console.log("User already exists..");
                setError("User already exists...");
                return;
            }
            
               router.replace("/login");
        } catch (err) {
            console.error(err);
            return NextResponse.json({ error: "ERROR! ", err });
        }
    }


    const handleToggle = () => {
        setVisible(!visible);
     }
     const handleToggle_b = () =>{
        setConfirmVisible(!confirmVisible);
     }


     const handleChange = (event) => {
        const value = event.target.value
        setState({
            ...state,
            [event.target.name]: value
        });
    }

    const handleChangeEmail = (event) => {
        const value = event.target.value
        setState({
            ...state,
            [event.target.name]: value
        });
    }

    const handleChangePassword = (event) => {
        const value = event.target.value
        setState({
            ...state,
            [event.target.name]: value
        });
    }




    const handleCheckChange = (event) => {
        const { name, checked } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
        console.log(state.newsletter)
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
                    <h1 className={`${montserrat.className} ${classes.section_heading}`}>Sign Up</h1>
                    <form onSubmit={handleSendForm} className={`${classes.below_content}`}>
                        <div className={classes.input_container}>
                        <input className={`${lightMontserrat.className} ${classes.submit_input}`} type="text"  name="firstName" value={state.firstName}
                                onChange={handleChange} aria-autocomplete="none"placeholder="First Name"  required maxLength={22}/>
                        </div>
                        <div className={classes.input_container}>
                        <input className={`${lightMontserrat.className} ${classes.submit_input}`} type="text" name="surname" aria-autocomplete="none"  placeholder="Surname" value={state.surname} onChange={handleChange} maxLength={22} required/>
                        </div>
                     <div className={classes.input_container}>
                        <input className={`${lightMontserrat.className} ${classes.submit_input}`} type="email" name="email" aria-autocomplete="none"   placeholder="Email" value={state.email} onChange={handleChangeEmail} maxLength={22} required/>
                       </div>
                       <div>

                    <label className={classes.input_eye} style={{marginLeft: "0%"}}>
                        <input className={`${lightMontserrat.className} ${classes.submit_input}`} type={visible ? "text" : "password"} aria-autocomplete="none"placeholder="Create password" name="password" value={state.password} onChange={handleChangePassword} minLength={6} required/>
                        <div className={classes.eye_icon}><Icon class="absolute mr-10"  icon={visible ? eyeOff : eye} size={25} className={classes.pw_toggle} onClick={handleToggle}/></div>
                    </label>
                  </div>
                  <br/>
                  <div>
             <label style={{marginLeft: "0%"}}>
                    <input className={`${lightMontserrat.className} ${classes.submit_input}`} type="password" name="confirmpassword" aria-autocomplete="none" value={state.confirmpassword} onChange={handleChange} placeholder="Confirm password"/>
    
             </label>
                  </div>
            <div className={classes.newsletter_container}>
            <label className={classes.container_label}>
            <input  type="checkbox" checked={state.newsletter} name="newsletter" onChange={handleCheckChange} className={classes.check_input} value={state.newsletter}/>
            <div className={classes.checkmark}></div>
            </label>
            <p>I would like to receive promotional codes and discounts from the newsletter</p>
            </div>
            <div className={classes.terms_and_services} >
                <p>
                    By creating an account, you ackowledge and agree to our <Link href={"/terms_and_services"}><span className={classes.link}>terms of service</span></Link>, and you have read and accepted the <Link href={"/global_privacy_policy"}><span className={classes.link}>Global Privacy Policy.</span></Link>
                </p>
            </div>
            <div className={classes.error}>{state.password != state.confirmpassword && "The passwords don't match"}</div>
                        {error && (
                            <div className={classes.error_message}>
                                {error}
                            </div>
                        )}
                <button className={`${classes.btn} ${montserrat.className}`} disabled={state.password != state.confirmpassword} type='submit'>Sign Up</button>
                    </form>
                    <>
                        {successMessage && (
                            <div className={classes.successMessage}>
                                {successMessage}
                            </div>
                        )}
                    </>
                    <div className={`${classes.existingacc} ${montserrat.className}` }>Already have an account? <Link href={"/login"}><span className={classes.underline}>Login</span></Link></div>

                </section>
            </div>
        </div>
    );
}
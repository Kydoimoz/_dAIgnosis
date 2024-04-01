import { React } from "react";
import classes from "./Medication.module.css";
import Image from "next/image";
import EntryModal from "@/components/EntryModal";
import { useState } from "react";
export default function Medication() {
    const now = new Date();
    const timeZoneOffsetMs = now.getTimezoneOffset() * 60000;
    const localTime = new Date(now.getTime() - timeZoneOffsetMs).toISOString().slice(0, 16);
    const [showComponent, setShowComponent] = useState(false);
    const handleClick = () => {
        setShowComponent(!showComponent);
    }
    return (
        <div className={classes.main}>
            {showComponent && <EntryModal />}
            <div className={classes.header}>
                <div className={classes.profile}>
                    <div className={classes.picture}>
                        <Image src="/images/random.jpg" style={{ borderRadius: '99px', position: "relative", left: "0.01%" }} width={190} height={160} />
                    </div>
                    <div className={classes.info}>
                        <h1 className={classes.heading}>Max Mustermann</h1>
                        <div className={classes.subinfo}>
                            <span>Age</span>
                            <span>Weight</span>
                            <span>Height</span>
                            <span>Gender</span>
                            <div className={classes.fetchedinfo}>
                                <span>23 yr</span>
                                <span>70 kg</span>
                                <span>1,81 m</span>
                                <span>Male</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.medics}>

                <div className={classes.navbar}>
                    { /*<h1>2024/03/02</h1>*/}
                    <form>
                        <input type="datetime-local" className={classes.date} defaultValue={localTime} />
                    </form>
                    <h1>Daily intake: 7</h1>
                    <div className={classes.intake}>
                        <button onClick={handleClick} className={classes.entry}>
                            {/*<span>Add new entry</span>*/}
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                        </button>
                    </div>
                    <div className={classes.history}>
                        <span>View history</span>
                    </div>
                </div>
                <div className={classes.flexcontainer}>
                    <div className={classes.flexbox}>
                        <div className={classes.action}></div>
                        <div className={classes.medicslogo}></div>
                        <div className={classes.metadata}>
                            <Image src="/images/pill.png" width={50} height={50} />
                            <h2>Paracetamol 500mg</h2>
                            <div className={classes.time}>
                                <Image src="/images/checked.png" width={20} height={20} />
                                <span>7:00am</span>
                            </div>
                            <span>Additional notes: </span>
                            <p>Lorem ipsum dolor sit amet. Et beastae reciendies ---- ....</p>
                        </div>
                    </div>
                    <div className={classes.flexbox}>
                        <div className={classes.action}></div>
                        <div className={classes.medicslogo}></div>
                        <div className={classes.metadata}>
                            <Image src="/images/pill.png" width={50} height={50} />
                            <h2>Paracetamol 500mg</h2>
                            <div className={classes.time}>
                                <Image src="/images/checked.png" width={20} height={20} />
                                <span>7:00am</span>
                            </div>
                            <span>Additional notes: </span>
                            <p>Lorem ipsum dolor sit amet. Et beastae reciendies ---- ....</p>
                        </div>
                    </div>
                    <div className={classes.flexbox}>
                        <div className={classes.action}></div>
                        <div className={classes.medicslogo}></div>
                        <div className={classes.metadata}>
                            <Image src="/images/pill.png" width={50} height={50} />
                            <h2>Paracetamol 500mg</h2>
                            <div className={classes.time}>
                                <Image src="/images/checked.png" width={20} height={20} />
                                <span>7:00am</span>
                            </div>
                            <span>Additional notes: </span>
                            <p>Lorem ipsum dolor sit amet. Et beastae reciendies ---- ....</p>
                        </div>
                    </div>
                    <div className={classes.flexbox}>
                        <div className={classes.action}></div>
                        <div className={classes.medicslogo}></div>
                        <div className={classes.metadata}>
                            <Image src="/images/pill.png" width={50} height={50} />
                            <h2>Paracetamol 500mg</h2>
                            <div className={classes.time}>
                                <Image src="/images/checked.png" width={20} height={20} />
                                <span>7:00am</span>
                            </div>
                            <span>Additional notes: </span>
                            <p>Lorem ipsum dolor sit amet. Et beastae reciendies ---- ....</p>
                        </div>
                    </div>
                    <div className={classes.flexbox}>
                        <div className={classes.action}></div>
                        <div className={classes.medicslogo}></div>
                        <div className={classes.metadata}>
                            <Image src="/images/pill.png" width={50} height={50} />
                            <h2>Paracetamol 500mg</h2>
                            <div className={classes.time}>
                                <Image src="/images/checked.png" width={20} height={20} />
                                <span>7:00am</span>
                            </div>
                            <span>Additional notes: </span>
                            <p>Lorem ipsum dolor sit amet. Et beastae reciendies ---- ....</p>
                        </div>
                    </div>
                    <div className={classes.flexbox}>
                        <div className={classes.action}></div>
                        <div className={classes.medicslogo}></div>
                        <div className={classes.metadata}>
                            <Image src="/images/pill.png" width={50} height={50} />
                            <h2>Paracetamol 500mg</h2>
                            <div className={classes.time}>
                                <Image src="/images/checked.png" width={20} height={20} />
                                <span>7:00am</span>
                            </div>
                            <span>Additional notes: </span>
                            <p>Lorem ipsum dolor sit amet. Et beastae reciendies ---- ....</p>
                        </div>
                    </div>
                    <div className={classes.flexbox}>
                        <div className={classes.action}></div>
                        <div className={classes.medicslogo}></div>
                        <div className={classes.metadata}>
                            <Image src="/images/pill.png" width={50} height={50} />
                            <h2>Paracetamol 500mg</h2>
                            <div className={classes.time}>
                                <Image src="/images/checked.png" width={20} height={20} />
                                <span>7:00am</span>
                            </div>
                            <span>Additional notes: </span>
                            <p>Lorem ipsum dolor sit amet. Et beastae reciendies ---- ....</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { React, useEffect, useState } from "react";
import classes from "./EntryModal.module.css";
import Image from "next/image";
export default function EntryModal() {
    const [medicaments, setMedicaments] = useState([]);
    const fetchMeds = async () => {
        try {
            const response = await fetch("/api/tasks/medication", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data);
            setMedicaments(data);
        } catch (error) {
            console.error("Error fetching medications:", error.message);
        }
    };
    useEffect(() => {
        fetchMeds();
    }, []);
    const [isVisible, setIsVisible] = useState(true);
    const handleOnClick = () => {
        setIsVisible(!isVisible);
    }
    return isVisible ? (
        <div className={classes.container}>

            <Image src="/images/medics.png" width={35} height={35} />
            <span>{new Date().getDate().toLocaleString()}</span>
            <div className={classes.entry_content}>
                <div className={classes.header}>
                    <h1>Add new entry</h1>
                    <div className={classes.close_modal} onClick={handleOnClick}>
                        <label htmlFor="closing-page">
                            X
                        </label>
                    </div>
                </div>
                <span className={classes.entry_meds}>Select desired Medicament: </span>
                <div className={classes.entry_select_container}>
                    <select className={classes.entry_select}>
                        <option value="">

                        </option>
                        {medicaments.map((medication, index) => (
                            <option key={index} value={medication.name}>{medication.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    ) : null
}
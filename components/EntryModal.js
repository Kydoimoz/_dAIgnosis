import { React, useEffect, useState } from "react";
import classes from "./EntryModal.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import nextAuth from "next-auth";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"], weight: "300" });
const boldMontserrat = Montserrat({ subsets: ["latin"], weight: "600" });
export default function EntryModal({selectedDate, onClose}) {
    const dateCreated = selectedDate;
    const [medicaments, setMedicaments] = useState([]);
    const [selectedMedication, setSelectedMedication] = useState("");
    const [formattedDate, setFormattedDate] = useState('');
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [input, setInput] = useState("");
    const { data: session } = useSession();
    const signedIn = session?.user;
    const token = session?.user?.id;
    const router = useRouter();
    const [error, setErrorMessage] = useState("");
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            const enteredTime = e.target.value;
            // Check if the entered time is not empty
            if (enteredTime.trim() !== "") {
                setSelectedTimes([...selectedTimes, enteredTime]);
                setErrorMessage(""); // Reset error message
            } else {
                console.log("Please enter a valid time.");
                setErrorMessage("Please enter in the correct time format!");
            }
        }
    }
    const handleSelectMedication = (e) => {
        setSelectedMedication(e.target.value);
        console.log("Selected Medicament:", e.target.value);
    }
    useEffect(() => {
        console.log(selectedMedication);
    }, [selectedMedication]);
    useEffect(() => {
        console.log("Selected Times:", selectedTimes);
    }, [selectedTimes]);
    useEffect(() => {
        console.log("Input: ", input);
    }, [input]);
    const handleDeleteTime = (index) => {
        const deletedTime = selectedTimes[index];
        const updatedTimes = selectedTimes.filter((time, i) => i !== index);
        setSelectedTimes(updatedTimes);
        console.log(`Deleted time: ${deletedTime}`);
        console.log("Remaining times:", updatedTimes);
    }
    
    const [isLoading, setIsLoading] = useState(true);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/medication/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: selectedDate,
                    medication: {
                        name: selectedMedication,
                        time: selectedTimes,
                        notes: input,
                        date: dateCreated
                    },
                    token: token,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                throw new Error('Failed to save medication entry');
            }
        } catch (error) {
            console.error('Error saving entry:', error.message);
        }
    };
    

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
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching medications:", error.message);
        }
    };
    useEffect(() => {
        const formatted = selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        setFormattedDate(formatted);
        fetchMeds();
    }, [selectedDate]);
    const [isVisible, setIsVisible] = useState(true);
    const handleOnClick = () => {
        setIsVisible(!isVisible);
        onClose();
    }
    return isVisible ? (
        <div className={classes.container}>
            {isLoading ? (
                <div className={classes.spinner_container}>
                    <div className={classes.spinner}></div>
                    <div className={`${classes.spinner_text} ${montserrat.className}`}><span>Loading ...</span></div>
                </div>
            ) : (
                <div className={classes.entry_content}>

                      <div className={classes.close_modal} onClick={handleOnClick}>
                            <label htmlFor="closing-page" className={montserrat.className}>X</label>
                        </div>
                        <div className={classes.entry_main}>
                    
                        <div className={classes.header}>
                        <h1 className={`${classes.heading} ${boldMontserrat.className}`}>Add new entry</h1>
                      
                    </div>
                    <div className={classes.pill}>
                    <Image src="/images/pill.png" width={50} height={50} />
                    </div>
             
                    <span className={`${boldMontserrat.className}`}>{formattedDate}</span>
                    <span className={`${classes.entry_meds} ${boldMontserrat.className}`}>Select desired Medicament: </span>
                    <div className={classes.entry_select_container}>
                        <select className={classes.entry_select} defaultValue="Choose Medicament" onChange={handleSelectMedication}>
                            <option value="">Choose Medicament</option>
                            {medicaments.map((medication, index) => (
                                <option key={index} value={medication.name}>{medication.name}</option>
                            ))}
                        </select>
                    </div>
                    <span className={`${classes.entry_meds} ${boldMontserrat.className}`}>Add time: </span>
                        <div className={classes.time}>
                        <input className={classes.input_time} type="time" id="appt" name="appt" min="00:00" max="23:00" onKeyDown={handleKeyPress} required />
                       <br/>
                        {error && (
    <div className={classes.error_message}>
        <p className={classes.error_text}>{error}</p>
    </div>
)}
                        {(selectedTimes.length > 0 || selectedTimes.some(time => time === "")) && (
                            <div className={classes.flex_items}>
                            {selectedTimes.map((time, index) => (
                                <div className={classes.stored} key={index}>
                                    <Image src="/images/selected.png" width={15} height={15} style={{cursor: "pointer"}} onClick={() => handleDeleteTime(index)}/>
                                    <p className={classes.space}>{time}</p>
                                </div>
                            ))}
                            </div>)}
                        </div>
                    <span className={`${classes.entry_meds} ${boldMontserrat.className}`}>Add helpful notes: </span>
                    <div className={classes.container_notes}>
                    <textarea className={classes.txt} type="text" placeholder="Write here..."  value={input} onChange={(e) => setInput(e.target.value)} ></textarea>
                    
                    </div>

                    <button className={`${classes.btn} ${montserrat.className}`} type='submit' onClick={handleSubmit}>Save</button>
                        </div>
                </div>
            )}
        </div>
    ) : null;
}
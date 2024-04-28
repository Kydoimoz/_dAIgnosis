import { React, useEffect } from "react";
import classes from "./Medication.module.css";
import Image from "next/image";
import EntryModal from "@/components/EntryModal";
import { useState } from "react";
import { useSession } from "next-auth/react";
export default function Medication() {
    const now = new Date();
    const timeZoneOffsetMs = now.getTimezoneOffset() * 60000;
    const localTime = new Date(now.getTime() - timeZoneOffsetMs).toISOString().slice(0, 10);
    const [showComponent, setShowComponent] = useState(false);
    const [entries, setEntries] = useState([]);
    const [selectedDate, setSelectedDate] = useState(localTime);
    const[localDate, setLocalDate] = useState(new Date(localTime));
    const {data: session} = useSession();
    const signedIn = session?.user;
    const token = session?.user?.id;
    const handleClick = () => {
        setShowComponent(!showComponent);
    }
    const realDate = new Date(localDate);
    //get_request:
useEffect(() => {
    console.log(showComponent);
}, [showComponent]);
    useEffect(() => {
        fetchMedication();
    }, [selectedDate]);

    //-------------
    //GET
    const fetchMedication = async(date) => {
        try{
            const res = await fetch(`/api/get_medication/${token}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(res.ok){
                const meds = await res.json();
                console.log(meds);
                setEntries(meds);
                console.log(entries);
            }
            else{
                console.error("Failed to fetch medication entries: ", res.statusText);
            }
        }
        catch(err){
            console.error("Error fetching Medication data ", err);
        }
    }
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setLocalDate(e.target.value);
    }
    //PUT
   /* const handleMedication = async() => {
        try {
            
      const medication_res = await  fetch(`/api/medication/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({medics}),
      })
    console.log(medication_res.data);
        }
        catch(err) {
            console.error(err);
        }   
    }*/
    //DELETE
    const handleDeleteMedication = async() => {
        try {

            const response = await fetch(`/api/medication/${token}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (response.ok) {
                console.log('Medikament erfolgreich gelöscht.');
              } else {
                console.error('Fehler beim Löschen des Medikaments:', response.statusText);
              }
      } catch (error) {
        console.error('Fehler beim Löschen des Medikaments:', error);
      }
    }
    
    handleDeleteMedication();
    //handleMedication();
    return (
        <div className={classes.main}>
            {showComponent && <EntryModal selectedDate={new Date(localDate)} onClose={handleClick} />}
            <div className={classes.header}>
                <div className={classes.profile}>
                    <div className={classes.picture}>
                        <Image src="/images/random.jpg" style={{ borderRadius: '99px', position: "relative", left: "0.01%" }} width={170} height={130} />
                    </div>
                    <div className={classes.info}>
                        <h1 className={classes.heading}>{session?.user?.firstName + " " + session?.user?.surname}</h1>
                        <div className={classes.flex_info}>
                            <div className={classes.subinfo}>
                                <div className={classes.creds}>
                                    <span className={classes.boldtxt}>E-Mail</span>
                                    <span>{session?.user?.email}</span>
                                </div>
                                <div className={classes.fetchedinfo}>
                                    <span className={classes.boldtxt}>Role</span>
                                    <span>Patient</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.medics}>
                <div className={classes.navbar}>
                    <form>
                        <input type="date" className={classes.date} defaultValue={selectedDate} value={selectedDate} onChange={handleDateChange} />
                    </form>
                    <h1>Daily intake: 7</h1>
                    <div className={classes.intake}>
                        <button onClick={handleClick} className={classes.entry}>
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
                    {session && entries.length > 0 ? (
                        entries.map((entry, index) => (
                            console.log("Times for entry", entry.name + ":", entry.time),
                            <div className={classes.flexbox} key={index}>
                                <div className={classes.action}></div>
                                <div className={classes.medicslogo}></div>
                                <div className={classes.metadata}>
                                    <Image src="/images/pill.png" width={50} height={50} />
                                    <h2>{entry.name}</h2>
                                    <div className={classes.time}>
                                        {entry.time.map((timex, i) => (
                                            <span key={i}>{timex}</span>
                                            
                                        ))}
                                    </div>
                                    <span>Additional notes: </span>
                                    <p>{entry.notes}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={classes.noMedicationMessage}>Still no medication. Add some...</div>
                    )}
                </div>
            </div>
        </div>
    )
}
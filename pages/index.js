import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChatHomePage from "@/components/pages/functionals/ChatHomePage";
import connectDB from "@/libs/connectDB";
import { motion, useAnimation } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  connectDB();
  const controls = useAnimation();

  const handleScrollAnimation = () => {
    const benefitsContainer = document.querySelector(`.${styles.benefits}`);
    if (benefitsContainer) {
      const benefitsContainerTop = benefitsContainer.getBoundingClientRect().top;
      if (benefitsContainerTop < window.innerHeight * 0.8) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 10 }
        });
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrollAnimation);
    return () => {
      window.removeEventListener("scroll", handleScrollAnimation);
    };
  }, []);

  return (
    <>
      <Head>
        <title>dAIgnosis™</title>
        <meta name="description" content="developed by dAIgnosis™" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        { /*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      <main className={`${styles.main}`}>
        <div className={styles.content}>
          <div className={styles.outerdiv}>
            <div className={styles.innerBackground}>
              <div className={styles.mainText}>
                <p>
                  <span className={styles.textSpan}>
                    Healing Starts Here: <span className={styles.brandName}>dAIgnosis ™</span> - Your Virtual Companion in Health.
                    <br />
                    Chat, Diagnose, Thrive.
                  </span>
                </p>

              </div>
              <div className={styles.buttons}>
                <button className={styles.btn} type="button" onClick={() => router.push("/dAIgnosisAI")}>Chat with our dAIgnosis - AI!</button>
                <button className={styles.btn} type="button" onClick={() => router.push("/medics")}>Get Medication</button>
              </div>
            </div>
          </div>

          <div className={styles.benefits}>
            <motion.div
              className={styles.benefits}
              animate={controls}
              initial={{ opacity: 0, y: 50 }}
              style={{ opacity: 0, y: 50 }}
            >
              <div className={styles.flexbox}>
                <Image style={{ marginBottom: "25px" }} src="/images/hospitalfr.png" width={150} height={150} />
                <div className={styles.flexboxContent}>
                  <div className={styles.title}>Medication</div>
                  <div className={styles.desc}>
                    <p className={styles.paragraph}>
                      Health plays a crucial role in our lives,
                      and so properly managing your medication
                      may add good to your well-being.
                      <br />
                      At dAIgnosis™, we offer an intuitive
                      platform where you can
                      stay in control of your medication intake.
                    </p>
                  </div>
                </div>

              </div>
              <div className={styles.flexbox}>
                <Image src="/images/ai.png" style={{ marginBottom: "25px" }} width={150} height={150} />
                <div className={styles.flexboxContent}>
                  <div className={styles.title}>Integrated AI</div>
                  <div className={styles.desc}>
                    <p className={styles.paragraph}>
                      We developed a bot for dAIgnosis™,
                      your personal health assistant.
                      Our intelligent chatbot uses advanced AI
                      technologies to provide a preliminary
                      <br />
                      assessment of possible illnesses
                      based on your symptoms.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
          <ChatHomePage />
        </div>
      </main>
    </>
  );
}

import Medication from "@/components/pages/medication/Medication";
import { React } from "react";
import classes from "../../styles/MedicationPage.module.css";
import { useState } from "react";
import Layout from "@/components/Layout";
export default function MedicationPage() {
    return (
        <Layout showFooter={false}>

            <Medication />
        </Layout>
    )
}
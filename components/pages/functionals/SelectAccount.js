import { Dropdown, Text } from "@nextui-org/react";
import classes from "../functionals/SelectAccount.module.css";
import {
    User,
    Grid,
    GridContainer,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SelectDropDown() {
    const [isRotated, setIsRotated] = useState(false);

    const handleClick = () => {
        setIsRotated(prevState => !prevState);
    };
    async function handleFilter(filter_option) {
        filter_option = filter_option.split(",").map(String);
        console.log("THIS IS FILTER OPTION", filter_option);
    }
    const router = useRouter();

    return (
        <div
            style={{
                backgroundColor: "transparent",
                height: "100px",
                width: "300px",
                marginLeft: "-570px",
                listStyle: "none",
                textDecoration: "none",
                outline: "none",
                position: "relative",
            }}
        >
            <span>
                <Dropdown placement="bottom-left" color={"red"}>
                    <DropdownTrigger
                        style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer", // Add this for better UX
                            margin: "35px",
                            fontSize: "1.3rem",
                            listStyle: "none",
                            textDecoration: "none",
                            position: "absolute",
                            width: "400px",
                            right: "-270px"
                        }}
                    >
                        <div
                            className={classes.name}
                        >

                            Max Mustermann
                            <Image className={classes.alterImg} onClick={handleClick} src="/images/menu.png" width={45} height={15} />

                        </div>
                    </DropdownTrigger>
                    <DropdownMenu
                        onAction={handleFilter}
                        aria-label="User Actions"
                        css={{ backgroundColor: "#fcfcfc", marginTop: "20px" }}
                        style={{
                            paddingBottom: "15px",
                            backgroundColor: "#c88a8a",
                            borderRadius: "7px",
                            marginTop: "55px",
                            width: "200px", // Set the width of the dropdown container
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow for a subtle effect
                            marginLeft: "calc(-55%)",
                            listStyle: "none",
                            position: "sticked"
                        }}
                    >
                        {/* Add your dropdown items (links) here */}
                        <DropdownItem
                            className={classes.hoverable}
                            onClick={() => router.push("/profile")}
                            style={{
                                textDecoration: "none", // Remove underlines from links
                                listStyle: "none", // Remove list-style from links
                                outline: "none",
                                paddingTop: "5px"
                            }} key="item1">
                            <div className={classes.profile_flex}>
                                <Image src="/images/profile.png" style={{
                                    paddingLeft: "5px"
                                }} width={37} height={30} />
                                <li style={dropdownLinkStyles}>Profile</li>
                            </div>
                        </DropdownItem>
                        <DropdownItem
                            style={{
                                textDecoration: "none", // Remove underlines from links
                                listStyle: "none", // Remove list-style from links
                                outline: "none",
                                paddingTop: "5px"
                            }}
                            onClick={() => router.push("/chat")}
                            className={classes.hoverable}
                            key="item2">
                            <div className={classes.profile_flex}>
                                <Image src="/images/daignosischat.png" style={{
                                    paddingLeft: "5px"
                                }} width={37} height={30} />
                                <li style={dropdownLinkStyles}>dAIgnosis - ChatBot</li>
                            </div>
                        </DropdownItem>
                        <DropdownItem
                            className={classes.hoverable}
                            onClick={() => router.push("/settings")}
                            style={{
                                textDecoration: "none", // Remove underlines from links
                                listStyle: "none", // Remove list-style from links
                                outline: "none",
                                paddingTop: "5px"
                            }}>

                            <div className={classes.profile_flex}>
                                <Image src="/images/settings.png" style={{
                                    paddingLeft: "5px"
                                }} width={37} height={30} />
                                <li style={dropdownLinkStyles}>Settings</li>
                            </div>
                        </DropdownItem>
                        <DropdownItem
                            className={`${classes.hoverable} ${classes.line}`}
                            style={{
                                textDecoration: "none", // Remove underlines from links
                                listStyle: "none", // Remove list-style from links
                                outline: "none",
                                paddingTop: "5px"
                            }}
                            onClick={() => router.push("/signout")}>
                            <div className={classes.profile_flex}>

                                <Image src="/images/signout.png" style={{
                                    paddingLeft: "5px"
                                }} width={37} height={30} />
                                <li style={dropdownLinkStyles}>Sign Out</li>
                            </div>
                        </DropdownItem>
                        {/* You can add more items as needed */}
                    </DropdownMenu>
                </Dropdown>
            </span>
        </div>
    );
}

const dropdownLinkStyles = {
    color: "white", // White color for the links
    padding: "10px", // Padding around each link
    textDecoration: "none", // Remove underlines from links
    listStyle: "none", // Remove list-style from links
    outline: "none",
};

// Add ::after pseudo-element for each link
dropdownLinkStyles.after = {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "1px",
    backgroundColor: "#fff", // White color for the line
};
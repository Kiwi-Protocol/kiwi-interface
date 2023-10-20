import React from "react";
import styles from "./index.module.css";
import ConnectWallet from "../ConnectWallet";
import { useNavigationStore } from "@/states/navState.state";

export default function Navbar() {
    const navState = useNavigationStore((state: any) => state.navState);

    const returnHeading = () => {
        switch (navState) {
            case "mints":
                return "My Mints";
            case "messages":
                return "Messages";
            case "profile":
                return "Profile";
            case "mintAvatar":
                return "Mint Avatar";
            case "achievements":
                return "Achievements";
            default:
                return "KIWI.";
        }
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.navbarHeaderContainer}>
                <h1 className={styles.navbarHeader}>{returnHeading()}</h1>
            </div>
            <div className={styles.navbarWCContainer}>
                <ConnectWallet />
            </div>
        </div>
    );
}

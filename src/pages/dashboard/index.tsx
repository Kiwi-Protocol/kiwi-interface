import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Layout } from "antd";
import ConnectWallet from "@/components/ConnectWallet";
import styles from "./index.module.css";
import { Sidebar } from "@/components/Sidebar";
import { Content } from "antd/es/layout/layout";
import { useNavigationStore } from "@/states/navState.state";
import Mints from "@/components/Mints";
import Messages from "@/components/Messages";
import Editor from "@/components/Editor";
import Profile from "@/components/Profile";
import { useAccount, useWalletClient } from "wagmi";
import { useWalletStore } from "@/states/walletState.state";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
    const navState = useNavigationStore((state: any) => state.navState);

    const { data: walletClient } = useWalletClient();

    const setWalletAddress = useWalletStore(
        (state: any) => state.setWalletAddress
    );

    useEffect(() => {
        handleGetAddress();
    }, [walletClient]);

    const handleGetAddress = async () => {
        if (walletClient) {
            const [address] = await walletClient.getAddresses();
            setWalletAddress(address);
        }
    };

    const assetPack = {
        hair: [
            {
                id: "1249081",
                name: "Long",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Fhair%2F32.png&w=384&q=75",
            },
            {
                id: "1249013",
                name: "Short",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Fhair%2F30.png&w=384&q=75",
            },
        ],
        eyes: [
            {
                id: "234242",
                name: "Round Shades",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Feyes%2F6.png&w=384&q=75",
            },
            {
                id: "d23uiry2",
                name: "Black Shades",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Feyes%2F7.png&w=384&q=75",
            },
            {
                id: "fuieh324",
                name: "Narrow Eyes",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Feyes%2F12.png&w=384&q=75",
            },
        ],
        mouth: [
            {
                id: "34ih2252",
                name: "Normal",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Fmouth%2F29.png&w=384&q=75",
            },
            {
                id: "h2ui5252",
                name: "Big Smile",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Fmouth%2F69.png&w=384&q=75",
            },
        ],
    };

    const handleNavigation = (component: string) => {
        switch (component) {
            case "mints":
                return <Mints />;
            case "messages":
                return <Messages />;
            case "profile":
                return <Profile />;
            case "mintAvatar":
                return <Editor assetPack={assetPack} />;
            default:
                return <h1>Page not found!</h1>;
        }
    };

    return (
        <>
            <Head>
                <title>Dashboard- Kiwi</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.mainContainerVertical}>
                    <Navbar />
                    {handleNavigation(navState)}
                </div>
            </div>
        </>
    );
}

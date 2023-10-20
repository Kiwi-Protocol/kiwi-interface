import React, { use, useEffect, useState } from "react";
import { EmbedSDK } from "@pushprotocol/uiembed";
import { Button } from "antd";
import { useWalletClient } from "wagmi";
import { useWalletStore } from "@/states/walletState.state";

export default function Messages() {
    const { data: walletClient } = useWalletClient();
    const walletAddress = useWalletStore((state: any) => state.walletAddress);

    useEffect(() => {
        handleEmbedPushChat();
    }, []);

    const handleEmbedPushChat = async () => {
        if (walletClient) {
            // 'your connected wallet address'

            EmbedSDK.init({
                // isInitialized: true, // optional
                headerText: "Kiwi Chat", // optional
                targetID: "qwerty", // mandatory
                appName: "Kiwi Chat App", // mandatory
                user: walletAddress, // mandatory
                chainId: 80001, // mandatory
                viewOptions: {
                    type: "sidebar", // optional [default: 'sidebar', 'modal']
                    showUnreadIndicator: true, // optional
                    unreadIndicatorColor: "#cc1919",
                    unreadIndicatorPosition: "bottom-right",
                },
                theme: "light",
                onOpen: () => {
                    console.log("-> client dApp onOpen callback");
                },
                onClose: () => {
                    console.log("-> client dApp onClose callback");
                },
            });
        } else {
            console.log("no address");
        }

        return () => {
            EmbedSDK.cleanup();
        };
    };

    return (
        <>
            <h1>Messages</h1>
            <button id="qwerty">trigger button</button>
        </>
    );
}

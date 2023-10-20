import React, { use, useEffect, useState } from "react";
import { EmbedSDK } from "@pushprotocol/uiembed";
import { Button } from "antd";
import { useWalletClient } from "wagmi";

export default function Messages() {
    const { data: walletClient } = useWalletClient();
    const [address, setAddress] = useState("");

    const handleGetAddress = async () => {
        if (walletClient) {
            const [address] = await walletClient.getAddresses();
            console.log(address);
            setAddress(address);
        }
    };

    useEffect(() => {
        handleGetAddress();
    }, [walletClient]);

    useEffect(() => {
        if (address != "") {
            // 'your connected wallet address'
            EmbedSDK.init({
                isInitialized: true, // optional
                headerText: "Kiwi Chat", // optional
                targetID: "qwerty", // mandatory
                appName: "consumerApp", // mandatory
                user: "0x7CC6E56d37eA31A31d0d59E41728bb034203C6DB", // mandatory
                chainId: 137, // mandatory
                viewOptions: {
                    type: "modal", // optional [default: 'sidebar', 'modal']
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
    }, [walletClient]);
    return (
        <>
            <h1>Messages</h1>
            <button id="qwerty">trigger button</button>
        </>
    );
}

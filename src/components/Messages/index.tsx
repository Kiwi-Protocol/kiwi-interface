import React, { use, useEffect, useState } from "react";
import { EmbedSDK } from "@pushprotocol/uiembed";
import { useAccount, useChainId, useWalletClient } from "wagmi";
import { useWalletStore } from "@/states/walletState.state";

export default function Messages() {
    const { address } = useAccount();
    const chainId = useChainId();

    const { data: walletClient } = useWalletClient();
    const walletAddress = useWalletStore((state: any) => state.walletAddress);

    useEffect(() => {
        if (address) {
            setTimeout(() => {
                // 'your connected wallet address'
                const result = EmbedSDK.init({
                    headerText: "Hello DeFi", // optional
                    targetID: "sdk-trigger-id", // mandatory
                    appName: "consumerApp", // mandatory
                    user: address, // mandatory
                    chainId: 137, // mandatory
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

                console.log({ result });
            }, 1000);
        }

        return () => {
            EmbedSDK.cleanup();
        };
    }, []);

    return (
        <>
            <h1>Messages</h1>
            <button id="sdk-trigger-id">trigger button</button>
        </>
    );
}

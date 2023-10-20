import Editor from "@/components/Editor";
import { useAccount } from "wagmi";
import { EmbedSDK } from "@pushprotocol/uiembed";
import { useEffect } from "react";
import ConnectWallet from "@/components/ConnectWallet";

function Test() {
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

    const { address } = useAccount();

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
            <h1>Editor Test</h1>
            <ConnectWallet />
            <button id="sdk-trigger-id">Message time again</button>
            <Editor assetPack={assetPack} onSave={() => {}} />
        </>
    );
}

export default Test;

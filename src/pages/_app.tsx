import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider, theme } from "antd";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, sepolia, goerli } from "wagmi/chains";
import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";


export default function App({ Component, pageProps }: AppProps) {
    const chains = [sepolia, goerli, arbitrum, mainnet, polygon];
    const projectId = "dd0d6065610301cf7f8d51557cbbffc3";
    const { publicClient } = configureChains(chains, [
        w3mProvider({ projectId }),
    ]);
    const wagmiConfig = createConfig({
        // autoConnect: true,
        connectors: w3mConnectors({ projectId, chains }),
        publicClient,
    });
    const ethereumClient = new EthereumClient(wagmiConfig, chains);

    return (
        <WagmiConfig config={wagmiConfig}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#2B2D42",
                        colorBgLayout: "#FFFF",
                    },
                    components: {
                        Button: {
                            colorPrimary: "#2B2D42",
                            colorBgContainer: "#2B2D42",
                        },
                    },
                }}
            >
                <Component {...pageProps} />
            </ConfigProvider>
            <Web3Modal
                projectId={projectId}
                ethereumClient={ethereumClient}
                themeVariables={{
                    "--w3m-accent-color": "#f72585",
                }}
            />
        </WagmiConfig>
    );
}

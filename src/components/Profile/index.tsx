import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

import { Card, Dropdown, Flex, MenuProps, Space, message } from "antd";
import { useWalletClient } from "wagmi";
import { CaretDownOutlined, DownOutlined } from "@ant-design/icons";
import useNFTs from "@/hooks/useNFTs";
// import Title from "antd/es/typography/Title";

export default function Profile() {
    const { data: walletClient } = useWalletClient();
    const [walletAddress, setWalletAddress] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState<any>(null);

    const { nfts, loading } = useNFTs();

    useEffect(() => {
        handleGetAddress();
    }, [walletClient]);

    useEffect(() => {
        handleGetAddress();
    }, []);

    const handleGetAddress = async () => {
        if (walletClient) {
            const [address] = await walletClient.getAddresses();
            setWalletAddress(address);
        }
    };

    const onChangeProfile: MenuProps["onClick"] = async ({ key }) => {};

    const items: MenuProps["items"] = nfts.map((item: any, i) => ({
        key: i,
        label: (
            <Flex
                style={{
                    alignItems: "center",
                }}
            >
                <img
                    src={item.metadata[0].image}
                    alt="mint"
                    width={"50px"}
                    style={{
                        marginRight: "10px",
                    }}
                />
                <div>
                    <h3>
                        {item.symbol} #{item.token_id}
                    </h3>
                    <p>{item.metadata[0].name}</p>
                </div>
            </Flex>
        ),
    }));

    return (
        <div className={styles.profileContainer}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.profileFlex}>
                    <Card
                        title={
                            <Dropdown
                                menu={{
                                    onClick: onChangeProfile,
                                    items: items,
                                }}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        {nfts.length > 0 && (
                                            <>
                                                <img
                                                    src={
                                                        nfts[0].metadata[0]
                                                            .image
                                                    }
                                                    alt="mint"
                                                    width={"50px"}
                                                    style={{
                                                        marginRight: "10px",
                                                    }}
                                                />
                                                <p>
                                                    {nfts[0].symbol} #
                                                    {nfts[0].token_id}
                                                </p>
                                            </>
                                        )}
                                        <CaretDownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        }
                        style={{
                            marginTop: "20px",
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <img
                            src={
                                nfts.length > 0
                                    ? nfts[0].metadata[0].image
                                    : "/mock_pixel.jpeg"
                            }
                            alt="profile"
                        />
                        <h4
                            style={{
                                textAlign: "center",
                            }}
                        >
                            {nfts.length > 0
                                ? nfts[0].metadata[0].name
                                : "Some Avatar ;)"}
                        </h4>
                    </Card>
                    <div className={styles.acheivementsContainer}></div>
                </div>
            )}
        </div>
    );
}

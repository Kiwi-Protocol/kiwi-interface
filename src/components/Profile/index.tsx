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

    const [selectedNFT, setSelectedNFT] = useState(nfts[0] as any);

    useEffect(() => {
        handleGetAddress();
    }, [walletClient]);

    useEffect(() => {
        handleGetAddress();
    }, []);

    useEffect(() => {
        if (nfts.length > 0) setSelectedNFT(nfts[0]);
    }, [nfts]);

    const handleGetAddress = async () => {
        if (walletClient) {
            const [address] = await walletClient.getAddresses();
            setWalletAddress(address);
        }
    };

    const onChangeProfile: MenuProps["onClick"] = async ({ key }) => {
        setSelectedNFT(nfts[+key]);
    };

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
                                                        selectedNFT &&
                                                        selectedNFT.metadata[0]
                                                            .image
                                                    }
                                                    alt="mint"
                                                    width={"50px"}
                                                    style={{
                                                        marginRight: "10px",
                                                    }}
                                                />
                                                <p>
                                                    {selectedNFT &&
                                                        selectedNFT.symbol}{" "}
                                                    #
                                                    {selectedNFT &&
                                                        selectedNFT.token_id}
                                                </p>
                                            </>
                                        )}
                                        <CaretDownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        }
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <img
                            src={
                                nfts.length > 0 && selectedNFT
                                    ? selectedNFT.metadata[0].image
                                    : "/mock_pixel.jpeg"
                            }
                            alt="profile"
                        />
                        <h4
                            style={{
                                textAlign: "center",
                            }}
                        >
                            {nfts.length > 0 && selectedNFT
                                ? selectedNFT.metadata[0].name
                                : "Some Avatar ;)"}
                        </h4>
                    </Card>
                    <div className={styles.achievementsContainer}>
                        {selectedNFT &&
                        selectedNFT.metadata[0].achievments.length > 0 ? (
                            selectedNFT.metadata[0].achievments.map(
                                (item: any) => (
                                    <Card
                                        title={item.name}
                                        extra={<p>{item.experience} XP</p>}
                                        style={{
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {item.description}
                                    </Card>
                                )
                            )
                        ) : (
                            <p>
                                No achievements earned yet, go play some games!
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

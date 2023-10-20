import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

import { Card, Dropdown, MenuProps, Space, message } from "antd";
import { useWalletClient } from "wagmi";
import { DownOutlined } from "@ant-design/icons";
// import Title from "antd/es/typography/Title";

export default function Profile() {
    const { data: walletClient } = useWalletClient();
    const [walletAddress, setWalletAddress] = useState("");

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

    const onChangeProfile: MenuProps["onClick"] = async () => {};

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: "jaymalave.kiwi",
            onClick: () => {},
        },
        {
            key: "2",
            label: "jayyy.kiwi",
            onClick: () => {},
        },
        {
            key: "3",
            label: "notjay.kiwi",
            onClick: () => {},
        },
    ];

    return (
        <div className={styles.profileContainer}>
            {/* <Title>Profile</Title> */}
            <h1>Profile</h1>
            {/* <div className={styles.profileFlexbox}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileImage}>
                        <img src="/mock_pixel.jpeg" alt="profile" />
                    </div>
                    <div className={styles.profileDetails}>
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
                                    jaymalave.kiwi
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                        <p>
                            Wallet Address:
                            {walletAddress}
                        </p>
                    </div>
                </div>
            </div> */}

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
                                jaymalave.kiwi
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                }
                cover={<img src="/mock_pixel.jpeg" alt="profile" />}
            >
                content
            </Card>
        </div>
    );
}

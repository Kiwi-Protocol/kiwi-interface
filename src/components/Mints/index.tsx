import React from "react";
import styles from "./index.module.css";
import { Button, Card } from "antd";
import Link from "next/link";
import { useNavigationStore } from "@/states/navState.state";

export default function Mints() {
    const setNavState = useNavigationStore((state: any) => state.setNavState);
    return (
        <div className={styles.mintsContainer}>
            <h1>My Mints</h1>
            <div className={styles.mintFlexbox}>
                {[...Array(10)].map((_, i) => (
                    <Card
                        className={styles.mintContainer}
                        key={i}
                        actions={[
                            <Button
                                className={styles.updateButton}
                                onClick={() => {
                                    setNavState("mintAvatar");
                                }}
                            >
                                Update
                            </Button>,
                        ]}
                    >
                        <div className={styles.mintImage}>
                            <img
                                src="/mock_pixel.jpeg"
                                alt="mint"
                                width={"175px"}
                            />
                        </div>
                        <div className={styles.mintDetails}>
                            <h3>Mint #{i + 1}</h3>
                            <p>Buy Price: 0.1 ETH</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

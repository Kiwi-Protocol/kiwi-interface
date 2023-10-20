import React from "react";
import styles from "./index.module.css";
import { Button, Card } from "antd";
import { useNavigationStore } from "@/states/navState.state";
import useNFTs from "@/hooks/useNFTs";
// import Title from "antd/es/typography/Title";

export default function Mints() {
    const setNavState = useNavigationStore((state: any) => state.setNavState);

    const { nfts } = useNFTs();

    return (
        <div className={styles.mintsContainer}>
            <div className={styles.mintFlexbox}>
                {nfts.map((item: any, i) => (
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
                                src={item.metadata[0].image}
                                alt="mint"
                                width={"175px"}
                            />
                        </div>
                        <div className={styles.mintDetails}>
                            <h3>{item.symbol} #{item.token_id}</h3>
                            <p>{item.metadata[0].name}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

import React from "react";
import styles from "./index.module.css";
import { Button, Card, Skeleton } from "antd";
import { useNavigationStore } from "@/states/navState.state";
import useNFTs from "@/hooks/useNFTs";
import { useRouter } from "next/router";
// import Title from "antd/es/typography/Title";

export default function Mints() {
    const setNavState = useNavigationStore((state: any) => state.setNavState);

    const router = useRouter();

    const { nfts, loading } = useNFTs();

    return (
        <div className={styles.mintsContainer}>
            {loading && (
                <div className={styles.mintFlexbox}>
                    {[...Array(4)].map((item, i) => (
                        <Card className={styles.mintContainer} key={i}>
                            <Skeleton.Avatar
                                style={{
                                    width: "175px",
                                    height: "175px",
                                    borderRadius: "50%",
                                }}
                            />

                            <Skeleton active />
                        </Card>
                    ))}
                </div>
            )}
            <div className={styles.mintFlexbox}>
                {nfts.map(
                    (item: any, i) =>
                        item.metadata[0] && (
                            <Card
                                className={styles.mintContainer}
                                key={i}
                                actions={[
                                    <Button
                                        className={styles.updateButton}
                                        onClick={() => {
                                            setNavState("updateAvatar");
                                            router.replace({
                                                query: {
                                                    id: item.token_id,
                                                },
                                            });
                                        }}
                                    >
                                        Update
                                    </Button>,
                                ]}
                            >
                                <div className={styles.mintImage}>
                                    <img
                                        src={item.metadata[0].image ?? ""}
                                        alt="mint"
                                        width={"175px"}
                                    />
                                </div>
                                <div className={styles.mintDetails}>
                                    <h3>
                                        {item.symbol} #{item.token_id}
                                    </h3>
                                    <p>{item.metadata[0].name}.kiwi</p>
                                </div>
                            </Card>
                        )
                )}
            </div>
        </div>
    );
}

import React from "react";
import styles from "./index.module.css";
import { Button, Card } from "antd";
import { useNavigationStore } from "@/states/navState.state";
// import Title from "antd/es/typography/Title";

export default function Mints() {
    const setNavState = useNavigationStore((state: any) => state.setNavState);
    return (
        <div className={styles.mintsContainer}>
            {/* <Title>My Mints</Title> */}
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
                            <h3>Kiwi #{i + 1}</h3>
                            <p>awesomename.kiwi</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

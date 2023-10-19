import React from "react";
import styles from "./index.module.css";
import { Button } from "antd";
import Link from "next/link";

export default function Mints() {
    return (
        <div className={styles.mintsContainer}>
            <h1>My Mints</h1>
            <div className={styles.mintFlexbox}>
                {[...Array(10)].map((_, i) => (
                    <div className={styles.mintContainer} key={i}>
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
                            <Link href={"/edit/" + (i + 1)}>
                                <Button className={styles.updateButton}>
                                    Update
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

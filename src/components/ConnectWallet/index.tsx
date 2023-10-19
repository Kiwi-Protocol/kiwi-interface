import { Web3Button } from "@web3modal/react";
import React from "react";
import styles from "./index.module.css";

export default function ConnectWallet() {
  return (
    <div className={styles.buttonStyles}>
      <Web3Button />
    </div>
  );
}

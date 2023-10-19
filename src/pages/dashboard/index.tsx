import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Layout } from "antd";
import ConnectWallet from "@/components/ConnectWallet";
import styles from "./index.module.css";
import { Sidebar } from "@/components/Sidebar";
import { Content } from "antd/es/layout/layout";
import { useNavigationStore } from "@/states/navState.state";

export default function Dashboard() {
  const navState = useNavigationStore((state: any) => state.navState);

  return (
    <>
      <Head>
        <title>Dashboard- Kiwi</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Sidebar />

        <ConnectWallet />
      </div>
    </>
  );
}
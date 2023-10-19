import { Menu } from "antd";
import React from "react";
import styles from "./index.module.css";
import { useNavigationStore } from "@/states/navState.state";

export function Sidebar() {
  const setNavState = useNavigationStore((state: any) => state.setNavState);
  return (
    <div className={styles.container}>
      <Menu
        mode="inline"
        style={{
          width: 200,
          backgroundColor: "#ffe5ec",
          height: "100vh",
          border: "none",
          margin: "0",
          paddingTop: "20px",
        }}
      >
        <Menu.Item
          className={styles.brandName}
          onClick={() => setNavState("dashboard")}
        >
          <a>KIWI.</a>
        </Menu.Item>
        <Menu.Item
          className={styles.menuItem}
          onClick={() => setNavState("dashboard")}
        >
          <a>Dashboard</a>
        </Menu.Item>
        <Menu.Item
          className={styles.menuItem}
          onClick={() => setNavState("login")}
        >
          <a>Login</a>
        </Menu.Item>
      </Menu>
    </div>
  );
}

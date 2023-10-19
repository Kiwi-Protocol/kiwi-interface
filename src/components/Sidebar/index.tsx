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
          backgroundColor: "#ffffff",
          height: "100vh",
          border: "none",
          margin: "0",
          paddingTop: "20px",
        }}
        items={[
          {
            key: "1",
            label: "KIWI.",
            onClick: () => {},
            className: styles.brandName,
          },
          {
            key: "2",
            label: "Mints",
            onClick: () => setNavState("mints"),
            className: styles.menuItem,
          },
          {
            key: "3",
            label: "Messages",
            onClick: () => setNavState("messages"),
            className: styles.menuItem,
          },
          {
            key: "4",
            label: "Profile",
            onClick: () => setNavState("profile"),
            className: styles.menuItem,
          },
          {
            key: "5",
            label: "Mint Avatar",
            onClick: () => setNavState("profile"),
            className: styles.menuItemOutlined,
          },
        ]}
      />
      {/* <Menu.Item
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
        </Menu.Item> */}
    </div>
  );
}

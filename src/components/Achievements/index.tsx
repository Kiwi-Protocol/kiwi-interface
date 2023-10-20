import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Button } from "antd";
import AddAchievementModal from "../AddAchievementModal";

export default function Achievements() {
    const [modalOpen, setModalOpen] = useState(false);

    const handleClose = () => {
        setModalOpen(false);
    };

    useEffect(() => {}, [modalOpen]);

    return (
        <div className={styles.achievementsContainer}>
            <Button className={styles.signUpButton} onClick={() => {}}>
                Sign up to add achievements
            </Button>
            <AddAchievementModal
                open={modalOpen}
                onCancel={() => {}}
                onOk={() => {}}
            />
        </div>
    );
}

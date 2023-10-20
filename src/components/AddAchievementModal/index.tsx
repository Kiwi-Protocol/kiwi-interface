import { Modal } from "antd";
import React, { useState } from "react";

interface AddAchievementModalProps {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
}

export default function AddAchievementModal({
    open,
    onOk,
    onCancel,
}: AddAchievementModalProps) {
    return (
        <Modal
            title="Add an achievement"
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            closable={true}
        >
            <h1>Add an achievement</h1>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Description" />
            <input type="text" placeholder="Image URL" />
            <input type="text" placeholder="Video URL" />
            <button
                onClick={() => {
                    console.log("Add button clicked!");
                    onOk();
                }}
            >
                Add
            </button>
        </Modal>
    );
}

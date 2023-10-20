import React, { useEffect, useState, useRef } from "react";
import styles from "./index.module.css";
import { Button, Modal } from "antd";
import { useWalletStore } from "@/states/walletState.state";
import { createUser, getUser } from "@/services/users.service";
import { message } from "antd";

export default function Achievements() {
    const [userExists, setUserExists] = useState<boolean>(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const experienceRef = useRef<HTMLInputElement>(null);
    const achievementNameRef = useRef<HTMLInputElement>(null);
    const achievementDescriptionRef = useRef<HTMLInputElement>(null);

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const [apiKey, setApiKey] = useState<string>("");

    const walletAddress = useWalletStore((state: any) => state.walletAddress);

    const handleCheckIfUserExists = async () => {
        const response = await getUser(walletAddress);
        if (response.status === 200) {
            console.log(response.data.data, "user exists");
            if (response.data.data.length > 0) {
                setUserExists(true);
            } else {
                setUserExists(false);
            }
        } else {
            setUserExists(false);
            console.log("user doesnt exist");
        }
    };

    useEffect(() => {
        handleCheckIfUserExists();
    }, []);

    const handleCreateUser = async () => {
        const paramsObj = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            wallet_address: walletAddress,
        };

        const response = await createUser(paramsObj);

        if (response.status === 200) {
            console.log(response.data.data, "user created");
            setApiKey(response.data.data.api_key);
            setIsModalVisible(true);
            message.success("User created");
        } else {
            console.log("user not created");
            message.error("Something went wrong");
        }
    };

    return (
        <div className={styles.achievementsContainer}>
            {userExists ? (
                <div className={styles.addForm}>
                    <h3>Enter details of the achievements</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        className={styles.inputBox}
                        ref={achievementNameRef}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className={styles.inputBox}
                        ref={achievementDescriptionRef}
                    />
                    <input
                        type="text"
                        placeholder="XPs"
                        className={styles.inputBox}
                        ref={experienceRef}
                    />
                    <button className={styles.submitButton} onClick={() => {}}>
                        Submit
                    </button>
                </div>
            ) : (
                <div className={styles.addForm}>
                    <h3>
                        Sign up to generate an API key to add your achievements
                    </h3>
                    <input
                        type="text"
                        placeholder="Name"
                        className={styles.inputBox}
                        ref={nameRef}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        className={styles.inputBox}
                        ref={emailRef}
                    />
                    <button
                        className={styles.submitButton}
                        onClick={handleCreateUser}
                    >
                        Generate
                    </button>
                </div>
            )}
            <Modal
                open={isModalVisible}
                onOk={() => {
                    setIsModalVisible(false);
                    handleCheckIfUserExists();
                }}
                onCancel={() => {
                    setIsModalVisible(false);
                    handleCheckIfUserExists();
                }}
            >
                <h3>Here's your API Key</h3>
                <p>{apiKey}</p>
                <p>
                    This API key is only displayed once. Please copy this and
                    save it somewhere safe.
                    <span style={{ color: "red" }}>
                        You will not be able to view this again.
                    </span>
                </p>
                <Button
                    onClick={() => {
                        setIsModalVisible(false);
                        handleCheckIfUserExists();
                    }}
                >
                    Close
                </Button>
            </Modal>
        </div>
    );
}

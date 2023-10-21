import React, { useEffect, useState, useRef } from "react";
import styles from "./index.module.css";
import { Button, Card, Modal } from "antd";
import { useWalletStore } from "@/states/walletState.state";
import { createUser, getUser } from "@/services/users.service";
import { message } from "antd";
import { createAchievement } from "@/services/achievements.service";
import useUserAchivements from "@/hooks/useUserAchivements";
import Meta from "antd/es/card/Meta";

export default function Achievements() {
    const [userExists, setUserExists] = useState<boolean>(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const experienceRef = useRef<HTMLInputElement>(null);
    const achievementNameRef = useRef<HTMLInputElement>(null);
    const achievementDescriptionRef = useRef<HTMLInputElement>(null);

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const [apiKey, setApiKey] = useState<string>("");
    const [creatorId, setCreatorId] = useState<string>("");

    const walletAddress = useWalletStore((state: any) => state.walletAddress);

    const { achievements, loading, fetchAchievements } = useUserAchivements();

    const handleCheckIfUserExists = async () => {
        const response = await getUser(walletAddress);
        if (response.status === 200) {
            console.log(response.data.data, "user exists");
            if (response.data.data.length > 0) {
                setCreatorId(response.data.data[0]._id);
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
            setCreatorId(response.data.data._id);
            setIsModalVisible(true);
            message.success("User created");
            //clear all refs
            nameRef.current!.value = "";
            emailRef.current!.value = "";
        } else {
            console.log("user not created");
            message.error("Something went wrong");
        }
    };

    const handleCreateAchievement = async () => {
        const paramsObj = {
            name: achievementNameRef.current?.value,
            description: achievementDescriptionRef.current?.value,
            image_url: "http://kiwiprotocol.xyz/kiwi.png",
            experience: experienceRef.current?.value,
            creator_id: creatorId,
        };

        console.log(paramsObj, "params obj for create acheivement");

        const response = await createAchievement(paramsObj);

        if (response.status === 200) {
            console.log(response.data.data, "achievement created");
            fetchAchievements();
            message.success("Achievement created");
        } else {
            console.log("achievement not created");
            message.error("Something went wrong");
        }
    };

    return (
        <div className={styles.achievementsContainer}>
            {userExists ? (
                <div>
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
                            type="number"
                            placeholder="XPs"
                            className={styles.inputBox}
                            ref={experienceRef}
                        />
                        <button
                            className={styles.submitButton}
                            onClick={handleCreateAchievement}
                        >
                            Submit
                        </button>
                    </div>

                    {loading && <p>Loading...</p>}
                    {achievements.length > 0 && (
                        <div style={{ marginTop: "10px" }}>
                            <h1 style={{ margin: "30px 0 20px" }}>
                                Achievements Created
                            </h1>
                            {achievements.map((item: any) => (
                                <Card
                                    title={item.name}
                                    extra={
                                        <p style={{ color: "gray", fontSize: "0.8rem" }}>
                                            {item._id}
                                        </p>
                                    }
                                    style={{ margin: "10px 0" }}
                                >
                                    <Meta
                                        title={item.description}
                                        description={
                                            <p>{item.experience} XP</p>
                                        }
                                    />
                                </Card>
                            ))}
                        </div>
                    )}
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

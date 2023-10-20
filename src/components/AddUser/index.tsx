import React, { useRef } from "react";
import message, { Button } from "antd";
import styles from "./index.module.css";

export default function AddUser() {
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.adduserContainer}>
            <input type="text" ref={nameRef} placeholder="Name" />
            <input type="text" ref={emailRef} placeholder="Email" />
            <Button className={styles.signUpButton} onClick={() => {}}>
                Sign up
            </Button>
        </div>
    );
}

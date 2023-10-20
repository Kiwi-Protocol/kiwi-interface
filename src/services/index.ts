import axios from "axios";

const BASE_URL = "https://kiwiprotocol.onrender.com/api/1.0.0";

const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default client;

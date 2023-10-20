import axios from "axios";
import { API_URL, MORALIS_API_KEY, NFT_API } from ".";

export const moralis = axios.create({
    baseURL: NFT_API,
    headers: {
        "X-API-Key": MORALIS_API_KEY,
        accept: "application/json",
    },
});

export const api = axios.create({
    baseURL: API_URL,
});

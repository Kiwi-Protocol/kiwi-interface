import axios from "axios";
import { MORALIS_API_KEY, NFT_API } from ".";

export const moralis = axios.create({
    baseURL: NFT_API,
    headers: {
        "X-API-Key": MORALIS_API_KEY,
        accept: "application/json",
    },
});

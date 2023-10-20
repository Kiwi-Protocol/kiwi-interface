import ax from "axios";
import { MORALIS_API_KEY, NFT_API } from ".";

export const moralis = ax.create({
    baseURL: NFT_API,
    headers: {
        "X-API-Key": MORALIS_API_KEY,
        accept: "application/json",
    },
});

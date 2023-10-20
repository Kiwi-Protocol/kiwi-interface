import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { CURRENT_CHAIN_HEX, NFT_ADDRESS } from "@/constants";
import { moralis } from "@/constants/axios";

function useNFTs() {
    const { address } = useAccount();
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        getNFTs();
    }, [address]);

    const getNFTs = async () => {
        if (!address) return;

        try {
            const { data } = await moralis.get(
                `/${address}/nft?chain=${CURRENT_CHAIN_HEX}&format=decimal&media_items=false&token_addresses%5B0%5D=${NFT_ADDRESS}`
            );

            console.log("Data from moralis nfts", data)

            setNfts(data.result);
        } catch (e) {
            console.error(e);
        }
    };

    return { nfts, getNFTs };
}

export default useNFTs;

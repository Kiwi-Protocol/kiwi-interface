import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { CURRENT_CHAIN_HEX, NFT_ADDRESS } from "@/constants";
import { api, moralis } from "@/constants/axios";

function useNFTs() {
    const { address } = useAccount();
    const [nfts, setNfts] = useState([] as any[]);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getNFTs();
    }, [address]);

    const getNFTs = async () => {
        if (!address) return;

        try {
            setLoading(true)
            const { data } = await moralis.get(
                `/${address}/nft?chain=${CURRENT_CHAIN_HEX}&format=decimal&media_items=false&token_addresses%5B0%5D=${NFT_ADDRESS}`
            );

            let localNfts = data.result as any[];

            localNfts = await Promise.all(
                localNfts.map(async (item) => {
                    const { data: tokenData } = await api.get(
                        "/kiwiAvatars/tokenUri/" + item.token_id
                    );
                    return {
                        ...item,
                        metadata: tokenData.data,
                    };
                })
            );

            console.log({ localNfts });

            setNfts(localNfts);
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.error(e);
        }
    };

    return { nfts, loading, getNFTs };
}

export default useNFTs;

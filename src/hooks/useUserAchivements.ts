import { api } from "@/constants/axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function useAchievements() {
    const { address } = useAccount();

    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAchievements();
    }, [address]);

    async function fetchAchievements() {
        if (!address) return;

        try {
            setLoading(true);

            // Yes spelling mistake in the api for "achievments"
            const { data } = await api.get(
                "/achievments?creator.wallet_address=" + address
            );

            setAchievements(data.data.reverse());

            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.error(e);
        }
    }

    return { achievements, loading, fetchAchievements };
}

export default useAchievements;

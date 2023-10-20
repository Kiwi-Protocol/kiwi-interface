import client from ".";

export const getUser = async (walletAddress: string) => {
    const response = await client.get("/users", {
        params: {
            wallet_address: walletAddress,
        },
    });
    console.log(response, "response getUser");
    return response;
};

export const createUser = async (data: any) => {
    const response = await client.post("/users", data);
    return response;
};

import client from ".";

export const createAchievement = async (data: any) => {
    const response = await client.post("/achievments", data);
    return response;
};

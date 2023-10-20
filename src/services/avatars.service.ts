import client from ".";

export const createAvatar = async (data: any) => {
    const response = await client.post("/kiwiAvatars", data);
    return response;
};

import client from ".";

export const createAvatar = async (data: any) => {
    const response = await client.post("/kiwiAvatars", data);
    return response;
};

export const updateAvatar = async (data: any, avatar_id: string) => {
    const response = await client.patch("/kiwiAvatars/" + avatar_id, data);
    return response;
};

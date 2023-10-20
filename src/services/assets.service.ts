import client from ".";

export const getAssets = async () => {
    const response = await client.get(
        "/kiwiAvatars/assets?typesNeeded=HAIR,EYES,MOUTH"
    );
    console.log(response, "response getAssets");
    return response;
};

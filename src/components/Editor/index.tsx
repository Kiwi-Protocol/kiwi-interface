import { Button, Card, Flex, Tabs } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.css";
import { parse } from "path";
import { createAvatar } from "@/services/avatars.service";
import { message } from "antd";
import { useWalletStore } from "@/states/walletState.state";

// import Title from "antd/es/typography/Title";

type Props = {
    assetPack: any;
    onSave?: (selected: any) => void;
};

function Editor({ assetPack, onSave }: Props) {
    const [selected, setSelected] = useState<typeof assetPack | {}>({});
    const nameRef = useRef<HTMLInputElement>(null);
    const walletAddress = useWalletStore((state: any) => state.walletAddress);

    useEffect(() => {
        console.log(selected, "selected");
    }, [selected]);

    function selectItem(type: string, item: any) {
        setSelected({ ...selected, [type]: item });
    }

    function isActive(type: string, item: any) {
        return selected[type] && selected[type].id === item.id;
    }

    useEffect(() => {
        console.log(assetPack, "asset pack from editor useeffect");
        parseAssetPack();
    }, []);

    const [parsedAssetPack, setParsedAssetPack] = useState<any>({});

    const parseAssetPack = useCallback(() => {
        let localPack: any = {};
        if (!assetPack) {
            console.log("no asset pack");
            return undefined;
        }
        assetPack.forEach((asset: any) => {
            console.log(asset, "asset from editor parse asset pack");
            localPack[asset._id] = [];
            console.log(parsedAssetPack, "parsed asset pack");
            asset.assets.map((innerAsset: any) => {
                console.log(asset, "asset from eps 2");
                localPack[asset._id].push({
                    id: innerAsset._id,
                    name: innerAsset.name,
                    image_url: innerAsset.image_url,
                });
            });
        });
        setParsedAssetPack(localPack);
    }, [assetPack]);

    useEffect(() => {
        console.log(parsedAssetPack, "parsed asset pack from editor useeffect");
    }, [parsedAssetPack]);

    const tabItems = Object.entries(parsedAssetPack).map(
        ([key, value]: [string, any]) => ({
            key,
            label: key,
            children: (
                <Flex gap={5}>
                    {value.map((val: any) => (
                        <Card
                            key={val.id}
                            onClick={() => selectItem(key, val)}
                            hoverable={true}
                            style={{
                                outline: isActive(key, val)
                                    ? "2px pink solid"
                                    : "",
                            }}
                        >
                            <img
                                src={val.image_url}
                                alt={val.name}
                                width={50}
                            />
                        </Card>
                    ))}
                </Flex>
            ),
        })
    );

    const handleCreateAvatar = async () => {
        const paramsObj = {
            name: nameRef.current?.value,
            wallet_address: walletAddress,
            characteristics: Object.keys(selected).map((type) => {
                return {
                    id: selected[type].id,
                };
            }),
        };
        console.log(paramsObj, "params obj");

        try {
            const response = await createAvatar(paramsObj);
            message.success("Avatar created", response.data);
        } catch (e) {
            console.error(e);
            message.error("Something went wrong");
        }
    };

    return (
        <div className={styles.editContainer}>
            {/* <Title>Mint Avatar</Title> */}
            {/* Preview. To be in order */}
            <Flex className={styles.preview}>
                {Object.keys(parsedAssetPack).map((type) => {
                    if (selected[type])
                        return (
                            <img
                                src={selected[type].image_url}
                                width={50}
                                style={{
                                    marginTop: "-40px",
                                    marginBottom: "20px",
                                }}
                            />
                        );
                })}
            </Flex>

            <input
                type="text"
                className={styles.nameInput}
                placeholder="Name for the Avatar"
                required
                ref={nameRef}
            />

            <Tabs
                style={{
                    width: "90%",
                    height: "100%",
                    marginTop: "2rem",
                    paddingLeft: "20px",
                }}
                items={tabItems}
                tabBarExtraContent={{
                    right: (
                        <Button type="primary" onClick={handleCreateAvatar}>
                            Mint
                        </Button>
                    ),
                }}
            />
        </div>
    );
}

export default Editor;

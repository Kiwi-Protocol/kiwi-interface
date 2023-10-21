import { Button, Card, Flex, Form, Input, InputRef, Tabs } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.css";
import { parse } from "path";
import { createAvatar, updateAvatar } from "@/services/avatars.service";
import { message } from "antd";
import { useWalletStore } from "@/states/walletState.state";
import { api } from "@/constants/axios";
import { useRouter } from "next/router";

// import Title from "antd/es/typography/Title";

type Props = {
    assetPack: any;
    buttonText?: string;
    onSave?: (selected: any) => void;
    isUpdate?: boolean;
};

type FieldType = {
    name?: string;
    description?: string;
    experience?: string;
    email?: string;
};

function Editor({ assetPack, buttonText, onSave, isUpdate }: Props) {
    const [selected, setSelected] = useState<typeof assetPack | {}>({});
    const nameRef = useRef<InputRef>(null);
    const walletAddress = useWalletStore((state: any) => state.walletAddress);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

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

    const handleUpdateAvatar = async () => {
        setLoading(true);
        if (!router.query.id) {
            setLoading(false);
            return;
        }

        try {
            message.info("Updating...");

            // Fetch Metadata to get MongoDB id for passing
            const { data: tokenData } = await api.get(
                "/kiwiAvatars/tokenUri/" + router.query.id
            );
            const avatar_id = tokenData.data[0]._id;

            const paramsObj = {
                name: nameRef.current?.input?.value,
                wallet_address: walletAddress,
                characteristics: Object.keys(selected).map((type) => {
                    return {
                        id: selected[type].id,
                    };
                }),
            };
            console.log(paramsObj, "params obj");

            await updateAvatar(paramsObj, avatar_id);
            message.success("Avatar Updated");
            setLoading(false);
        } catch (e) {
            console.error(e);
            message.error("Something went wrong");
            setLoading(false);
        }
    };

    const handleCreateAvatar = async () => {
        setLoading(true);
        const paramsObj = {
            name: nameRef.current?.input?.value,
            wallet_address: walletAddress,
            characteristics: Object.keys(selected).map((type) => {
                return {
                    id: selected[type].id,
                };
            }),
        };
        console.log(paramsObj, "params obj");

        try {
            message.info("Creating...");
            await createAvatar(paramsObj);
            message.success("Avatar Created");
            setLoading(false);
        } catch (e) {
            console.error(e);
            message.error("Something went wrong");
            setLoading(false);
        }
    };

    return (
        <div className={styles.editContainer}>
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
                                }}
                            />
                        );
                })}
            </Flex>

            {!isUpdate && (
                <Form
                    name="basic"
                    // labelCol={{ span: 3 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Name of the Avatar"
                        labelAlign="left"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name!",
                            },
                        ]}
                    >
                        <Input ref={nameRef} />
                    </Form.Item>
                </Form>
            )}

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
                        <Button
                            loading={loading}
                            type="primary"
                            onClick={() =>
                                isUpdate
                                    ? handleUpdateAvatar()
                                    : handleCreateAvatar()
                            }
                        >
                            {buttonText || "Mint"}
                        </Button>
                    ),
                }}
            />
        </div>
    );
}

export default Editor;

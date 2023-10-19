import { Button, Card, Flex, Tabs } from "antd";
import { useState } from "react";

type Props = {
    assetPack: any;
    onSave?: (selected: any) => void;
};

function Editor({ assetPack, onSave }: Props) {
    const types = Object.keys(assetPack).length;

    if (!types || types === 0)
        return <>No Types to Customize in this Asset Pack</>;

    const [selected, setSelected] = useState<typeof assetPack | {}>({});

    function selectItem(type: string, item: any) {
        setSelected({ ...selected, [type]: item });
    }

    function isActive(type: string, item: any) {
        return selected[type] && selected[type].id === item.id;
    }

    const tabItems = Object.entries(assetPack).map(
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
                            <img src={val.image} alt={val.name} width={50} />
                        </Card>
                    ))}
                </Flex>
            ),
        })
    );

    return (
        <div>
            {/* Preview. To be in order */}
            <Flex vertical>
                {Object.keys(assetPack).map((type) => {
                    if (selected[type])
                        return (
                            <img
                                src={selected[type].image}
                                width={50}
                                style={{
                                    marginTop: "-40px",
                                }}
                            />
                        );
                })}
            </Flex>

            <Tabs
                items={tabItems}
                tabBarExtraContent={{
                    right: (
                        <Button
                            type="primary"
                            onClick={() => onSave?.(selected)}
                        >
                            Save
                        </Button>
                    ),
                }}
            />
        </div>
    );
}

export default Editor;

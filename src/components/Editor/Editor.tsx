import { Tabs } from "antd";
import { useState } from "react";

type Props = {
    assetPack: any;
};

function Editor({ assetPack }: Props) {
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
                <div className="flex flex-wrap gap-3">
                    {value.map((val: any) => (
                        <div
                            key={val.id}
                            className={
                                "w-20 h-20 bg-pink-100 hover:bg-pink-200 focus:bg-pink-300 rounded-xl grid place-items-center cursor-pointer transition " +
                                (isActive(key, val) &&
                                    "border-2 border-pink-500")
                            }
                            title={val.name}
                            onClick={() => selectItem(key, val)}
                        >
                            <img
                                src={val.image}
                                alt={val.name}
                                className="w-10 h-10"
                            />
                        </div>
                    ))}
                </div>
            ),
        })
    );

    return (
        <div className="m-10 p-5 bg-white text-black rounded-lg">
            {/* Preview. To be in order */}
            <div className="pt-7">
                {Object.keys(assetPack).map((type) => {
                    if (selected[type])
                        return (
                            <img
                                src={selected[type].image}
                                className="w-10 h-10 -mt-8"
                            />
                        );
                })}
            </div>

            <Tabs items={tabItems} />
        </div>
    );
}

export default Editor;

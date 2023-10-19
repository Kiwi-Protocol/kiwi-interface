import Editor from "@/components/Editor/Editor";
import { Flex } from "antd";
import { useRouter } from "next/router";

function EditNFT() {
    const router = useRouter();

    // TODO: Fetch available Asset Pack
    const assetPack = {
        hair: [
            {
                id: "1249081",
                name: "Long",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Fhair%2F32.png&w=384&q=75",
            },
            {
                id: "1249013",
                name: "Short",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Fhair%2F30.png&w=384&q=75",
            },
        ],
        eyes: [
            {
                id: "234242",
                name: "Round Shades",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Feyes%2F6.png&w=384&q=75",
            },
            {
                id: "d23uiry2",
                name: "Black Shades",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Feyes%2F7.png&w=384&q=75",
            },
            {
                id: "fuieh324",
                name: "Narrow Eyes",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Feyes%2F12.png&w=384&q=75",
            },
        ],
        mouth: [
            {
                id: "34ih2252",
                name: "Normal",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Fmouth%2F29.png&w=384&q=75",
            },
            {
                id: "h2ui5252",
                name: "Big Smile",
                image: "https://8biticon.com/_next/image?url=%2Fstatic%2Fimages%2Fcomponents%2Fmale%2Fmouth%2F69.png&w=384&q=75",
            },
        ],
    };

    return (
        // TODO: Add this in main layout with sidebar
        <>
            <h1
                style={{
                    textAlign: "center",
                    marginTop: "3rem",
                    fontFamily: "fantasy",
                }}
            >
                Kiwi Avatar #{router.query.id}
            </h1>

            <Flex justify="center" align="center" style={{ marginTop: "2rem" }}>
                <img src="/mock_pixel.jpeg" alt="mint" width="175" />
            </Flex>

            <div style={{ margin: "5rem" }}>
                <Editor assetPack={assetPack} />
            </div>
        </>
    );
}

export default EditNFT;

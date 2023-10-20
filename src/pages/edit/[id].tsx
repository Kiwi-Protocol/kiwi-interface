import Editor from "@/components/Editor";
import { Flex } from "antd";
import { useRouter } from "next/router";

function EditNFT() {
    const router = useRouter();

    // TODO: Fetch available Asset Pack

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

            <div style={{ margin: "5rem" }}></div>
        </>
    );
}

export default EditNFT;

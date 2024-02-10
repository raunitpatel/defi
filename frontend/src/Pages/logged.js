import { useState } from 'react';
import logo from "../images/WhatsApp Image 2024-02-07 at 19.42.05_efcd37c1.jpg";
import axios from "axios";
function LoggedIn({ loginUser }) {
    const [selectedSemester, setSelectedSemester] = useState("");
    const [cpi, setCPI] = useState('');
    const [spi, setSPI] = useState('');
    const [generatedImage, setGeneratedImage] = useState(null);
    const [generatedBlob, setGeneratedBlob] = useState(null); 
    const [prompt, setPrompt] = useState("");

    const starton = axios.create({
        baseURL: "https://api.starton.io/v3",
        headers: {
            "x-api-key": "sk_live_3e41b1e1-ca9d-44bd-bedf-3af0cf301633",
        },
      })
    async function uploadToIPFS(imageBlob) {
        const formData = new FormData();
        formData.append("file", imageBlob);
    
        // Use formData in the request, instead of undefined data variable
        const ipfsImg = await starton.post("/ipfs/file", formData);
        // Removed the Content-Type header to let axios handle it automatically
    
        return ipfsImg.data; // Corrected to use the correct variable
    }
    
    // Function to handle the change in semester selection
    const handleSemesterChange = (event) => {
        const selectedSemesterIndex = event.target.value;
        setSelectedSemester(selectedSemesterIndex);

        // Assuming the CPI and SPI data are available in the loginUser object
        if (loginUser && loginUser.length > 0) {
            const semesterData = loginUser[0].sems[selectedSemesterIndex - 1]; // Adjust index since array index starts from 0
            if (semesterData) {
                setCPI(semesterData.cpi);
                setSPI(semesterData.spi);
                setPrompt(`Create NFT based on following data: branch:${loginUser[0].branch}, semester:${selectedSemesterIndex}, cpi:${semesterData.cpi}, spi:${semesterData.spi}.`);
            }
        }
    };

    


    const generateImage = async () => {
        // Your image generation logic but modify to also set the blob in state
        try {
            const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify({ "inputs": prompt })
            });
            const blob = await response.blob();
            const imageURL = URL.createObjectURL(blob);
            setGeneratedImage(imageURL); // Set the image URL for display
            setGeneratedBlob(blob); // Store the blob for upload
        } catch (error) {
            console.error("Failed to generate or upload to IPFS:", error);
        }
    };

    const mintNFT = async () => { 
        const SMART_CONTRACT_NETWORK = "polygon-mumbai";
        const SMART_CONTRACT_ADDRESS = "0x7721A8769e9c5b7F1fbd40b0ed0a6c56D913728B";
        const WALLET_IMPORTED_ON_STARTON = "0x05923AAA784766D232Ed5f1C6c39d2CC011abEE2";
        const RECEIVER_ADDRESS = "0x7A24efd8A8a46A2D71d419915972E5585168B107";

        // Ensure generatedBlob exists
        if (!generatedBlob) {
            alert("Please generate an image first.");
            return;
        }

        try {
            // Upload image to IPFS
            const ipfsResponse = await uploadToIPFS(generatedBlob);
            console.log("IPFS Upload Success:", ipfsResponse);

            // Mint NFT using Starton API
            const nft = await axios.post(`https://api.starton.io/v3/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`, {
                functionName: "mint",
                signerWallet: WALLET_IMPORTED_ON_STARTON,
                speed: "low",
                params: [RECEIVER_ADDRESS, ipfsResponse.cid],
            });
            console.log("NFT Minted:", nft.data);
            alert("NFT Minted successfully!");
        } catch (error) {
            console.error("Failed to mint NFT:", error);
            alert("Failed to mint NFT.");
        }
    };
    


    return (
        <div className="logged_in">
            <div className="navbar_logged">
                <img src={logo} alt="" className="logo_logged" />
                <div className="login_details">
                    {loginUser && loginUser.length > 0 && (
                        <div className="welcome_logged">
                            <div>{loginUser[0].Name}</div>
                            <div>{loginUser[0].roll_no}</div>
                        </div>
                    )}
                    <div className="log_out">
                        <button onClick={() => { window.location.href='http://localhost:5000/logout'  }} >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
            <div className="logged_details">
                <div className="first_box">
                    <div className="result">
                        <div className="semester_name">SEMESTER {selectedSemester}</div>
                        {loginUser && loginUser.length > 0 && (
                            <div>
                                <div className="result_name">{loginUser[0].Name}</div>
                                <div className="result_roll">{loginUser[0].roll_no}</div>
                            </div>
                        )}
                        <div className="cpi">CPI:{cpi}</div>
                        <div className="spi">SPI:{spi}</div>
                    </div>
                    <div className="semester">
                        <select id="fruits" value={selectedSemester} onChange={handleSemesterChange}>
                            <option value="" disabled>Select Semester</option>
                            {loginUser && loginUser.length > 0 && loginUser[0].sems && loginUser[0].sems.map((semester, index) => (
                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                        <button className="generate" onClick={generateImage}>Generate Image</button>
                    </div>
                </div>
                <div className="second_box">
                    <div className="nft_image">
                        {generatedImage && <img src={generatedImage} className="generated_image" alt="Generated Image" />}
                        <button className="mint_nft" onClick={mintNFT}>MINT NFT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoggedIn;

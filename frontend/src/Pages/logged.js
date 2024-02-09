import { useState } from 'react';
import logo from "../images/WhatsApp Image 2024-02-07 at 19.42.05_efcd37c1.jpg";

function LoggedIn({ loginUser }) {
    const [selectedSemester, setSelectedSemester] = useState("");
    const [cpi, setCPI] = useState('');
    const [spi, setSPI] = useState('');
    const [generatedImage, setGeneratedImage] = useState(null);
    const [prompt, setPrompt] = useState("");

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

    // Function to handle generating the image
    const generateImage = async () => {
        const promptData = prompt;
        // Example:
        async function query(data) {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
                {
                    headers: { Authorization: "Bearer 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" },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.blob();
            return result;
        }
        query({"inputs": "peaky blinders"}).then((response) => {
            const imageURL = URL.createObjectURL(response);
            setGeneratedImage(imageURL);
        });
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
                        <button className="mint_nft">MINT NFT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoggedIn;

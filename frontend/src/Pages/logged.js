import { useState } from 'react';
import logo from "../images/WhatsApp Image 2024-02-07 at 19.42.05_efcd37c1.jpg";

function LoggedIn({ loginUser }) {
    const [selectedSemester, setSelectedSemester] = useState("");
    const [cpi, setCPI] = useState('');
    const [spi, setSPI] = useState('');

    // Function to handle the change in semester selection
    const handleSemesterChange = (event) => {
        const selectedSemesterIndex = event.target.value;
        setSelectedSemester(selectedSemesterIndex);

        // Assuming the CPI and SPI data are available in the loginUser object
        const semesterData = loginUser[0].sems[selectedSemesterIndex - 1]; // Adjust index since array index starts from 0
        setCPI(semesterData.cpi);
        setSPI(semesterData.spi);
    };

    return (
        <div className="logged_in">
            <div className="navbar_logged">
                <img src={logo} alt="" className="logo_logged" />
                <div className="login_details">
                    {loginUser.length > 0 && (
                        <div className="welcome_logged">
                            <div>{loginUser[0].Name}</div>
                            <div>{loginUser[0].roll_no}</div>
                        </div>
                    )}
                    <div className="log_out">
                        <button onClick={() => { window.location.href='http://localhost:5000/logout' }}>
                            Log out
                        </button>
                    </div>
                </div>
            </div>
            <div className="logged_details">
                <div className="first_box">
                    <div className="result">
                        <div className="cpi">{cpi}</div>
                        <div className="spi">{spi}</div>
                    </div>
                    <div className="semester">
                        <select id="fruits" value={selectedSemester} onChange={handleSemesterChange}>
                            {/* <option value="" >Select Semester</option> */}
                            {loginUser[0].sems.map((semester, index) => (
                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                        <button className="generate">Generate Image</button>
                    </div>
                </div>
                <div className="second_box">
                    <div className="nft_image"></div>
                    <button className="mint_nft">MINT NFT</button>
                </div>
            </div>
        </div>
    );
}

export default LoggedIn;

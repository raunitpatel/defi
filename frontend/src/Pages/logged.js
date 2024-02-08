import axios from 'axios';
import useEffect, { useState } from 'react'
import { getUserByid } from '../api/userApi';
import logo from "../images/WhatsApp Image 2024-02-07 at 19.42.05_efcd37c1.jpg"
function LoggedIn({loginUser}){
    console.log(loginUser,'ajfklajflj')
    const getdata=()=>{
            axios.get('http://localhost:5000/get-user')
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            });
    }
 
    return (
        
    <div className="logged_in">
        <div className="navbar_logged">
            <img src={logo} alt="" className="logo_logged" />
            
            {loginUser.length>0 && <div className="welcome_logged">
                <div>{loginUser[0].Name}</div>
                <div>{loginUser[0].roll_no}</div>
            </div>}
            
            <div className="log_out"><button onClick={()=>{window.location.href='http://localhost:5000/logout'}}>Log out</button></div>
        </div>
        <div className="logged_details">
            <div className="first_box">
                <div className="result"></div>
                <div className="semester">
                <select id="fruits">
                    <option value="" disabled selected>Select Semester</option>
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="orange">Orange</option>
                    <option value="grape">Grape</option>
                </select>
                <button className="generate">Genarate Image</button>
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
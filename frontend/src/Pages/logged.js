import axios from 'axios';
export function LoggedIn(){
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
            <img src="" alt="" className="logo_logged" />
            <div className="project_title_logged"><p>MintSem</p> </div>
            <div className="welcome_logged">Welcome Raunit Patel</div>
            <div className="log_out"><button onClick={()=>{window.location.href='http://localhost:5000/logout'}}>Log out</button></div>
        </div>
        <div className="logged_details">
            <div className="first_box">
                <div className="result"></div>
                <select id="fruits">
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="orange">Orange</option>
                    <option value="grape">Grape</option>
                </select>
                <button className="generate">Genarate Image</button>
            </div>

            <div className="second_box">
                <div className="nft_image"></div>
                <button className="mint_nft">MINT NFT</button>
            </div>
        </div>
    </div>
    );
}
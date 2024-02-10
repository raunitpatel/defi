import express from "express";
import authRoutes from './router.js';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from "./routes/userroutes.js";
import multer from "multer";
import axios from 'axios';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use your routes
app.use('/', authRoutes);
app.use('/api',userRouter);

// starton
// const upload = multer({
//   limits:{
//       fileSize:1000000
//   }
// })

// const starton = axios.create({
//   baseURL: "https://api.starton.io/v3",
//   headers: {
//       "x-api-key": "sk_live_3e41b1e1-ca9d-44bd-bedf-3af0cf301633",
//   },
// })

// app.post('/upload',cors(),upload.single('file'),async(req,res)=>{
 
//   let data = new FormData();
//   const blob = new Blob([req.file.buffer],{type:req.file.mimetype});
//   data.append("file",blob,{filename:req.file.originalnam})
//   data.append("isSync","true");

//   async function uploadImageOnIpfs(){
//       const ipfsImg = await starton.post("/ipfs/file", data, {
//           headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` },
//         })
//         return ipfsImg.data;
//   }
//   async function uploadMetadataOnIpfs(imgCid){
//       const metadataJson = {
//           name: `A Wonderful NFT`,
//           description: `Probably the most awesome NFT ever created !`,
//           image: `ipfs://ipfs/${imgCid}`,
//       }
//       const ipfsMetadata = await starton.post("/ipfs/json", {
//           name: "My NFT metadata Json",
//           content: metadataJson,
//           isSync: true,
//       })
//       return ipfsMetadata.data;
//   }
  
//   const SMART_CONTRACT_NETWORK="polygon-mumbai";
//   const SMART_CONTRACT_ADDRESS="0x7721A8769e9c5b7F1fbd40b0ed0a6c56D913728B";
//   const WALLET_IMPORTED_ON_STARTON="0x05923AAA784766D232Ed5f1C6c39d2CC011abEE2";
//   async function mintNFT(receiverAddress,metadataCid){
//       const nft = await starton.post(`/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`, {
//           functionName: "mint",
//           signerWallet: WALLET_IMPORTED_ON_STARTON,
//           speed: "low",
//           params: [receiverAddress, metadataCid],
//       })
//       return nft.data;
//   }
//   const RECEIVER_ADDRESS = "0x5BBcb4584cF3ee4739011c72f14504D9b7da52f9"
//   const ipfsImgData = await uploadImageOnIpfs();
//   const ipfsMetadata = await uploadMetadataOnIpfs(ipfsImgData.cid);
//   const nft = await mintNFT(RECEIVER_ADDRESS,ipfsMetadata.cid)
//   console.log(nft)
//   res.status(201).json({
//       transactionHash:nft.transactionHash,
//       cid:ipfsImgData.cid
//     })
//   })

// MongoDB Connection
mongoose.connect('mongodb+srv://raunit1995:VxUB9coLo2CVgWfw@cluster0.6hl1urk.mongodb.net/results', {

  
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const port = 5000;
app.listen(port,async () => {
  console.log(`Listening on port ${port}`);
  
});

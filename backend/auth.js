import * as msal from "@azure/msal-node";
import { getUserFromToken } from "./user.js";


const msalConfig = {
  auth: {
    clientId: "fd9fce18-8564-4baa-8061-6855c4202b33",
    authority:
      "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c",
    clientSecret: "jaT8Q~PtP6G6UN3hJo1eCvA2a5~pgKmKBIFP_aaR",
  },
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

export const login = (req, res) => {
  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: "http://localhost:5000/redirect",
  };

  cca
    .getAuthCodeUrl(authCodeUrlParameters)
    .then((response) => {
      res.redirect(response);
    })
    .catch((error) => {
      console.error("Error generating auth code URL:", error);
      res.status(500).send("Error initiating login process");
    });
};

export const redirect = async (req, res) => {
  try {
    const tokenRequest = {
      code: req.query.code,
      scope: "user.read",
      redirectUri: "http://localhost:5000/redirect",
    };


    const response = await cca.acquireTokenByCode(tokenRequest);
    const accessToken = response.accessToken;

    
    const user = await getUserFromToken(accessToken);

    console.log(user);
  //  console.log(accessToken);

    res.redirect('http://localhost:3000/logged');
  //  res.send('Login Successful!');
  } catch (error) {
    console.error("Error during redirect:", error);
    res.status(500).send("Error during login process");
  }
};

export const logout = (req, res) => {
  try {
    res.redirect("https://login.microsoftonline.com/common/oauth2/v2.0/logout");

    res.send("Logout Successfully");
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).send("Error during logout");
  }
};
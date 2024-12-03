import { userPool ,CognitoUser,AuthenticationDetails} from "./index.service";


import { loginUser } from "./login.service";
import { signupUser } from "./signup.service";

export const initiateGoogleLogin = async () => {
  try {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECTURI;
    const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=code&scope=openid%20email%20profile&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=google_login`;

    window.location.href = loginUrl;
  } catch (error) {
    console.error("Google Login initiation failed:", error);
    throw error;
  }
};


export const handleGoogleCallback = async (code) => {
  try {
    
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECTURI,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || "Failed to exchange token");
    }

    const { id_token } = tokenData;
    const decodedToken = JSON.parse(atob(id_token.split(".")[1]));
    const email = decodedToken.email;
    const name = decodedToken.name;

    if (!email || !name) {
      throw new Error("Failed to extract user information from Google token");
    }

    try {
      const loginResponse = await loginUser(email, import.meta.env.VITE_GOOGLE_PASS);
      console.log("Login successful:", loginResponse);

      localStorage.setItem("idToken", loginResponse.idToken);
      return {
        message: "Login successful",
        username: loginResponse.username,
      };
    } catch (loginError) {
      
      if (loginError.includes("User does not exist")) {
        console.log("User not found, proceeding with signup...");

        
        const randomPassword = import.meta.env.VITE_GOOGLE_PASS; 

        const signupResponse = await signupUser(email, name, randomPassword);
        console.log("Signup successful:", signupResponse);

        const loginResponseAfterSignup = await loginUser(email, randomPassword);

        // Save tokens to localStorage
        localStorage.setItem("idToken", loginResponseAfterSignup.idToken);
        return {
          message: "Signup and login successful",
          username: loginResponseAfterSignup.username,
        };
      } else {
        throw new Error(loginError);
      }
    }
  } catch (error) {
    console.error("Google callback action failed:", error);
    throw error;
  }
};

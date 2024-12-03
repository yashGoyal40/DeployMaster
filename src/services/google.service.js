import { userPool } from "./index.service";

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
    console.log(tokenData)

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || "Failed to exchange token");
    }

    const { id_token } = tokenData;

    const response = await fetch(`${import.meta.env.VITE_API_URL}/oauth/cognito/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken: id_token }),
    });

    const cognitoData = await response.json();

    if (!response.ok) {
      throw new Error(cognitoData.error || "Failed to process Cognito login");
    }

    const { email, username, googleId } = cognitoData;

    localStorage.setItem("idToken", cognitoData.idToken);

    return { email, username, googleId };
  } catch (error) {
    console.error("Google callback handling failed:", error);
    throw error;
  }
};
